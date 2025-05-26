import { useState, useEffect } from 'react';

// Base URLs for the local Quran JSON files
const API_BASE_URL = '/api/quran';

// Reciter ID for Mishary Rashid Al Afasy
const RECITER_ID = '1';

// Main API endpoint for English translation (contains all surah info)
const ENGLISH_API = `${API_BASE_URL}/english.json`;

/**
 * Hook to fetch the list of all surahs
 */
export const useSurahList = () => {
  const [surahList, setSurahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        setLoading(true);
        // Fetch the English translation which contains all surah info
        const response = await fetch(ENGLISH_API);
        if (!response.ok) {
          throw new Error('Failed to fetch surah list');
        }
        const data = await response.json();
        
        // Transform the data to match the expected format
        const transformedData = Object.keys(data).map(surahId => {
          const surah = data[surahId];
          return {
            id: parseInt(surahId), // Keep the original ID for internal reference
            surahNo: parseInt(surahId) + 1, // Ensure surah number starts from 1
            name: surah.surahNameArabic,
            transliteration: surah.surahName,
            translation: surah.surahNameTranslation,
            total_verses: surah.totalAyah,
            type: surah.revelationPlace, // 'Mecca' or 'Madina'
            // Get audio URL for Mishary Rashid Al Afasy - using originalUrl
            audio: surah.audio && surah.audio[RECITER_ID] ? 
                   surah.audio[RECITER_ID].originalUrl : 
                   `https://server8.mp3quran.net/afs/${surahId.toString().padStart(3, '0')}.mp3`
          };
        });
        
        // Sort by surah ID to ensure correct order
        transformedData.sort((a, b) => a.id - b.id);
        
        setSurahList(transformedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching surah list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahList();
  }, []);

  return { surahList, loading, error };
};

/**
 * Hook to fetch a specific surah with translations
 */
export const useSurah = (surahName) => {
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translations, setTranslations] = useState({
    arabic: [],
    english: [],
    bengali: [],
    urdu: [],
    turkish: []
  });

  useEffect(() => {
    const fetchSurah = async () => {
      if (!surahName) return;
      
      try {
        setLoading(true);
        
        // First, get the English translation data which has all surah info
        const englishResponse = await fetch(ENGLISH_API);
        if (!englishResponse.ok) {
          throw new Error('Failed to fetch surah data');
        }
        const allSurahsData = await englishResponse.json();
        
        // Find the surah by name
        const standardizeName = (name) => {
          return name.toLowerCase()
            .replace(/[-\s']/g, '') // Remove hyphens, spaces, and apostrophes
            .replace(/^al/, '')      // Remove 'al' prefix
            .replace(/^at/, '')      // Remove 'at' prefix
            .replace(/^an/, '')      // Remove 'an' prefix
            .replace(/^as/, '');     // Remove 'as' prefix
        };
        
        const standardizedSearchName = standardizeName(surahName);
        
        // Find the matching surah by comparing standardized names
        let matchingSurahId = null;
        let matchingSurahData = null;
        
        for (const [id, data] of Object.entries(allSurahsData)) {
          if (standardizeName(data.surahName) === standardizedSearchName) {
            matchingSurahId = id;
            matchingSurahData = data;
            break;
          }
        }
        
        // If no exact match, try partial match
        if (!matchingSurahId) {
          for (const [id, data] of Object.entries(allSurahsData)) {
            const stdName = standardizeName(data.surahName);
            if (stdName.includes(standardizedSearchName) || standardizedSearchName.includes(stdName)) {
              matchingSurahId = id;
              matchingSurahData = data;
              break;
            }
          }
        }
        
        if (!matchingSurahId || !matchingSurahData) {
          throw new Error(`Surah '${surahName}' not found`);
        }
        
        console.log(`Found surah: ${matchingSurahData.surahName} (ID: ${matchingSurahId})`);
        
        // Get audio URL - using originalUrl for Mishary Rashid Al Afasy
        let audioUrl = '';
        if (matchingSurahData.audio && matchingSurahData.audio[RECITER_ID]) {
          audioUrl = matchingSurahData.audio[RECITER_ID].originalUrl;
        } else {
          // Fallback to the standard mp3quran.net URL format
          audioUrl = `https://server8.mp3quran.net/afs/${matchingSurahId.toString().padStart(3, '0')}.mp3`;
        }
        
        // Create the surah object
        const surahInfo = {
          id: parseInt(matchingSurahId),
          surahNo: parseInt(matchingSurahId) + 1, // Ensure surah number starts from 1
          name: matchingSurahData.surahNameArabic,
          transliteration: matchingSurahData.surahName,
          translation: matchingSurahData.surahNameTranslation,
          total_verses: matchingSurahData.totalAyah,
          type: matchingSurahData.revelationPlace,
          audio: audioUrl,
          verses: []
        };
        
        // Initialize translations object
        const translationsObj = {
          arabic: [],
          english: [],
          bengali: [],
          urdu: [],
          turkish: []
        };
        
        // Fetch each translation
        const translationFiles = [
          { name: 'arabic', key: 'arabic' },
          { name: 'english', key: 'english' },
          { name: 'bengali', key: 'bengali' },
          { name: 'urdu', key: 'urdu' },
          { name: 'turkish', key: 'turkish' }
        ];
        
        // English translation is already available
        if (matchingSurahData.translation) {
          translationsObj.english = matchingSurahData.translation.map((text, idx) => ({
            id: idx + 1,
            text: text
          }));
        }
        
        // Fetch other translations
        for (const translation of translationFiles) {
          if (translation.name === 'english') continue; // Skip English as we already have it
          
          try {
            const response = await fetch(`${API_BASE_URL}/${translation.name}.json`);
            if (response.ok) {
              const data = await response.json();
              if (data[matchingSurahId] && data[matchingSurahId].translation) {
                translationsObj[translation.key] = data[matchingSurahId].translation.map((text, idx) => ({
                  id: idx + 1,
                  text: text
                }));
              }
            }
          } catch (e) {
            console.error(`Error fetching ${translation.name} translation:`, e);
          }
        }
        
        // Set translations state
        setTranslations(translationsObj);
        
        // Create verses array
        const verses = [];
        const verseCount = matchingSurahData.totalAyah;
        
        for (let i = 0; i < verseCount; i++) {
          const arabicText = translationsObj.arabic[i]?.text || '';
          const englishText = translationsObj.english[i]?.text || '';
          
          verses.push({
            id: i + 1,
            text: arabicText,
            roman: englishText, // Use English as transliteration
            translation: englishText
          });
        }
        
        surahInfo.verses = verses;
        setSurah(surahInfo);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching surah:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSurah();
  }, [surahName]);
  
  return { surah, translations, loading, error };
};
