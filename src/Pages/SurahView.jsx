import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarDefault from '../Components/NavbarDefault';
import { Button, Chip, Card, List, ListItem, Select, Option, Typography, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useSurahList, useSurah } from '../hooks/useQuranApi';


function SurahView() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [selectedSurah, setSelectedSurah] = useState("");
    const [AudioSource, setAudioSource] = useState("");
    
    const current_surah = name.toLowerCase();
    
    // Fetch surah list
    const { surahList, loading: listLoading } = useSurahList();
    
    // Fetch current surah with translations
    const { surah: surahData, translations, loading: surahLoading, error } = useSurah(current_surah);
    
    useEffect(() => {
        if (surahData) {
            setSelectedSurah(`${surahData.surahNo || surahData.id + 1}. ${surahData.transliteration} (${surahData.name})`);
            setAudioSource(surahData.audio);
        }
    }, [surahData]);

    const surahNavigator = (transliteration) => {
      const surahName = transliteration.toLowerCase();
      navigate(`/surah/${surahName}`);
    };

    const handlePrevClick = () => {
      const currentIndex = surahList.findIndex(
        (surah) => surah.transliteration.toLowerCase() === current_surah
      );
      if (currentIndex === 0) {
        const lastSurah = surahList[surahList.length - 1];
        const surahName = lastSurah.transliteration.toLowerCase();
        setSelectedSurah(`${lastSurah.surahNo || lastSurah.id + 1}. ${lastSurah.transliteration} (${lastSurah.name})`);
        setAudioSource(lastSurah.audio);
        navigate(`/surah/${surahName}`);
      } else if (currentIndex > 0) {
        const prevSurah = surahList[currentIndex - 1];
        const surahName = prevSurah.transliteration.toLowerCase();
        setSelectedSurah(`${prevSurah.surahNo || prevSurah.id + 1}. ${prevSurah.transliteration} (${prevSurah.name})`);
        setAudioSource(prevSurah.audio);
        navigate(`/surah/${surahName}`);
      }
    };
    
    const handleNextClick = () => {
      const currentIndex = surahList.findIndex(
        (surah) => surah.transliteration.toLowerCase() === current_surah
      );
      if (currentIndex < surahList.length - 1) {
        const nextSurah = surahList[currentIndex + 1];
        const surahName = nextSurah.transliteration.toLowerCase();
        setSelectedSurah(`${nextSurah.surahNo || nextSurah.id + 1}. ${nextSurah.transliteration} (${nextSurah.name})`);
        setAudioSource(nextSurah.audio);
        navigate(`/surah/${surahName}`);
      } else if (currentIndex === surahList.length - 1) {
        const firstSurah = surahList[0];
        const surahName = firstSurah.transliteration.toLowerCase();
        setSelectedSurah(`${firstSurah.surahNo || firstSurah.id + 1}. ${firstSurah.transliteration} (${firstSurah.name})`);
        setAudioSource(firstSurah.audio);
        navigate(`/surah/${surahName}`);
      }
    };    
    
    if (listLoading || surahLoading) {
        return (
            <React.Fragment>
                <NavbarDefault activePage="surah" />
                <div className="container my-5 text-center">
                    <Typography variant="h4" color="blue-gray">Loading...</Typography>
                </div>
            </React.Fragment>
        );
    }
    
    if (error || !surahData) {
        return (
            <React.Fragment>
                <NavbarDefault activePage="surah" />
                <div className="container my-5 text-center">
                    <Typography variant="h4" color="red">Error: {error || 'Surah not found'}</Typography>
                </div>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <NavbarDefault activePage="surah" />
            <div className="container my-5">
            <div className="row">
                <div className="col-12 text-center">
                   <Typography variant="h1" className="font-normal text-blue-gray-600">{surahData.name}</Typography>
                   <div class="border-t border-gray-300 w-20 mb-2 mt-1 mx-auto bg-blue-gray-500"></div>
                   <Typography variant="h5" className="font-normal text-blue-gray-900">{surahData.surahNo || surahData.id}. {surahData.transliteration} : {surahData.translation}</Typography>
                </div>
                <div className="col-12 my-4">
                <div className="row">
                <div className="col-md-3 mx-auto flex justify-between items-baseline mb-3">
                  <Button variant="outlined" size="sm" className="px-2 py-1 mr-4" onClick={handlePrevClick}><i class="fas fa-chevron-left"></i></Button>
                    <Select variant="standard" className="arab-font" value={selectedSurah} label="Navigate to Another Surah">
                    {surahList.map((surah) => (
                        <Option key={surah.id} className="arab-font" onClick={() => surahNavigator(surah.transliteration)}>{surah.surahNo || surah.id}. {surah.transliteration} ({surah.name})</Option>
                    ))}
                    </Select>
                  <Button variant="outlined" size="sm" className="px-2 py-1 ml-4" onClick={handleNextClick}><i class="fas fa-chevron-right"></i></Button>
                </div>
                <div className="col-12 row flex justify-center m-0">
                  <audio controls key={AudioSource} class="col-md-8 mx-auto">
                    <source src={AudioSource} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                </div>
                </div>
                <div className="col-md-10 mx-auto px-0">
                <Tabs value="arabic">
                    <TabsHeader>
                        <Tab key="arabic" value="arabic">Arabic</Tab>
                        <Tab key="english" value="english">English</Tab>
                        <Tab key="bengali" value="bengali">Bengali</Tab>
                        <Tab key="urdu" value="urdu">Urdu</Tab>
                        <Tab key="turkish" value="turkish">Turkish</Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                        }}>
                        <TabPanel key="arabic" value="arabic" className="px-2 pt-3">
                          <Card>
                            <List className="px-0">
                              {current_surah !== 'al-fatiha' && current_surah !== 'at-tawbah' && (
                                  <ListItem key="0" className="flex justify-start items-center" style={{ direction: 'rtl' }}>
                                    <Chip value="0" variant="outlined" size="sm" className="rounded-full text-white border-white mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Typography>
                                  </ListItem>
                                )}
                              {surahData.verses.map((verse) => (
                                <ListItem
                                  key={verse.id} className="flex justify-start items-center" style={{ direction: 'rtl' }}>
                                  <Chip value={verse.id} variant="outlined" size="sm" className="rounded-full text-blue-gray-600 border-blue-gray-600 ml-3" />
                                  <Typography variant="span" className="arab-font font-normal text-blue-gray-900" style={{lineHeight: 'normal'}}>{verse.text}</Typography>
                                </ListItem>
                              ))}
                            </List>
                          </Card>
                        </TabPanel>

                        <TabPanel key="english" value="english" className="px-2 pt-3">
                          <Card>
                              <List className="px-0">
                                {current_surah !== 'al-fatiha' && current_surah !== 'at-tawbah' && (
                                  <ListItem key="0" className="text-center">
                                    <Chip value="0" variant="outlined" size="sm" className="rounded-full text-white border-white mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">In the name of Allah, Most Gracious, Most Merciful.</Typography>
                                  </ListItem>
                                )}
                                {surahData.verses.map((verse, index) => (
                                  <ListItem key={verse.id} className="flex items-center">
                                    <Chip value={verse.id} variant="outlined" size="sm" className="rounded-full text-blue-gray-600 border-blue-gray-600 mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">
                                      {translations.english[index]?.text || verse.translation}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                          </Card> 
                        </TabPanel>
                        <TabPanel key="bengali" value="bengali" className="px-2 pt-3">
                          <Card>
                              <List className="px-0">
                                {current_surah !== 'al-fatiha' && current_surah !== 'at-tawbah' && (
                                  <ListItem key="0" className="text-center">
                                    <Chip value="0" variant="outlined" size="sm" className="rounded-full text-white border-white mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</Typography>
                                  </ListItem>
                                )}
                                {surahData.verses.map((verse, index) => (
                                  <ListItem key={verse.id} className="flex items-center">
                                    <Chip value={verse.id} variant="outlined" size="sm" className="rounded-full text-blue-gray-600 border-blue-gray-600 mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">
                                      {translations.bengali[index]?.text || 'Translation not available'}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                          </Card> 
                        </TabPanel>
                        <TabPanel key="urdu" value="urdu" className="px-2 pt-3">
                          <Card>
                              <List className="px-0">
                                {current_surah !== 'al-fatiha' && current_surah !== 'at-tawbah' && (
                                  <ListItem key="0" className="text-center">
                                    <Chip value="0" variant="outlined" size="sm" className="rounded-full text-white border-white mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</Typography>
                                  </ListItem>
                                )}
                                {surahData.verses.map((verse, index) => (
                                  <ListItem key={verse.id} className="flex items-center">
                                    <Chip value={verse.id} variant="outlined" size="sm" className="rounded-full text-blue-gray-600 border-blue-gray-600 mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">
                                      {translations.urdu[index]?.text || 'Translation not available'}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                          </Card> 
                        </TabPanel>
                        <TabPanel key="turkish" value="turkish" className="px-2 pt-3">
                          <Card>
                              <List className="px-0">
                                {current_surah !== 'al-fatiha' && current_surah !== 'at-tawbah' && (
                                  <ListItem key="0" className="text-center">
                                    <Chip value="0" variant="outlined" size="sm" className="rounded-full text-white border-white mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">Rahman ve Rahim olan Allah'ın adıyla.</Typography>
                                  </ListItem>
                                )}
                                {surahData.verses.map((verse, index) => (
                                  <ListItem key={verse.id} className="flex items-center">
                                    <Chip value={verse.id} variant="outlined" size="sm" className="rounded-full text-blue-gray-600 border-blue-gray-600 mr-3" />
                                    <Typography variant="span" className="arab-font font-normal text-blue-gray-900">
                                      {translations.turkish[index]?.text || 'Translation not available'}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                          </Card> 
                        </TabPanel>
                    </TabsBody>
                </Tabs>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default SurahView;