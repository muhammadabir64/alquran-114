import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import AsmaUlHusna from './Pages/AsmaUlHusna';
import SurahList from './Pages/SurahList';
import SurahView from './Pages/SurahView';
import Dua from './Pages/Dua';
import Alphabet from './Pages/Alphabet';
import API from './Pages/API';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/asma-ul-husna" element={<AsmaUlHusna />} />
      <Route path="/surah" element={<SurahList />} />
      <Route path="/surah/:name" element={<SurahView />} />
      <Route path="/dua" element={<Dua />} />
      <Route path="/alphabet" element={<Alphabet />} />
      <Route path="/api" element={<API />} />
    </Routes>
  );
}

export default App;