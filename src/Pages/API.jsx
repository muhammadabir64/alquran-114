import React from 'react';
import NavbarDefault from '../Components/NavbarDefault';
import ApiBlocks from '../Components/ApiBlocks';
import { Typography } from "@material-tailwind/react";


function API() {
    return (
        <React.Fragment>
            <NavbarDefault activePage="api" />
            <div className="container my-5">
            <div className="row">
                <div className="col-12 text-center">
                <Typography
                variant="h2"
                className="text-center text-blue-gray-600"
                ><i class="fas fa-code-branch" style={{ transform: 'rotate(85deg)' }}></i> API</Typography>
                <Typography
                variant="p"
                color="blue-gray"
                className="text-center"
                >Access JSON data for Surahs, Duas, Asma-ul-Husna, and more through our API. Our API provides a wide range of data to support your applications and services.</Typography>
                </div>
                <div className="col-12 mt-3">
                <div className="row">
                    <ApiBlocks title="Asma-ul-Husna" description="Explore the divine 'Beautiful Names' of Allah (God) in Islam. Access meanings and attributes for spiritual reflection." url="asma-ul-husna.json" />
                    <ApiBlocks title="Duas" description="Discover significant supplications (Duas) in Islam for blessings and guidance. Access a collection of important prayers for various occasions." url="dua.json" />

                    <ApiBlocks title="Arabic Alphabet" description="Access data related to the Arabic alphabets, comprising 28 fundamental characters. Ideal for educational and language-related applications." url="alphabet.json" />
                    
                    <Typography variant="h4" className="mt-4 mb-2 text-blue-gray-700">Quran Translations</Typography>
                    <ApiBlocks title="Quran - Arabic" description="Access the holy Quran in Arabic script." url="quran/arabic.json" />
                    <ApiBlocks title="Quran - English" description="Access the holy Quran with English translation." url="quran/english.json" />
                    <ApiBlocks title="Quran - Bengali" description="Access the holy Quran with Bengali translation." url="quran/bengali.json" />
                    <ApiBlocks title="Quran - Urdu" description="Access the holy Quran with Urdu translation." url="quran/urdu.json" />
                    <ApiBlocks title="Quran - Turkish" description="Access the holy Quran with Turkish translation." url="quran/turkish.json" />
                </div>
                </div>
            </div>
            </div>

        </React.Fragment>
    );
}

export default API;