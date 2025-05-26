import React from 'react';
import { Link } from 'react-router-dom';
import NavbarDefault from '../Components/NavbarDefault';
import {
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";
import "./Home.css";


function Home() {
    return (
        <React.Fragment>
            <NavbarDefault />
            <div className="container my-5">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="row">
                    <div className="col-md-6">
                    <Link to="/asma-ul-husna">
                    <Card className="mt-6 card_hover">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="text-center mb-2">
                            Asma-ul-Husna
                            </Typography>
                            <Typography>
                            Asma-ul-Husna, or "The Beautiful Names," reflects Allah's attributes, offering insight into His perfection and greatness.
                            </Typography>
                        </CardBody>
                    </Card>
                    </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to="/surah">
                    <Card className="mt-6 card_hover">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="text-center mb-2">
                            Al-Quran
                            </Typography>
                            <Typography>
                            The Quran, sacred to Islam, is God's revelation to Prophet Muhammad (peace be upon him), providing spiritual guidance and timeless wisdom.
                            </Typography>
                        </CardBody>
                    </Card>
                    </Link>
                    </div>

                    <div className="col-md-6">
                    <Link to="/dua">
                    <Card className="mt-6 card_hover">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="text-center mb-2">
                            Dua
                            </Typography>
                            <Typography>
                            Discover significant Duas (supplications) in Islam, cherished for seeking blessings and guidance from Allah.
                            </Typography>
                        </CardBody>
                    </Card>
                    </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to="/alphabet">
                    <Card className="mt-6 card_hover">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="text-center mb-2">
                            Alphabet
                            </Typography>
                            <Typography>
                            Explore the 28 Arabic alphabets used in the Quran and Arabic language.
                            </Typography>
                        </CardBody>
                    </Card>
                    </Link>
                    </div>
                    <div className="col-md-6">
                    <Link to="/api">
                    <Card className="mt-6 card_hover">
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="text-center mb-2">
                            API
                            </Typography>
                            <Typography>
                            Access JSON data for Surahs, Duas, Asma-ul-Husna, and more through our API.
                            </Typography>
                        </CardBody>
                    </Card>
                    </Link>
                    </div>

                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Home;
