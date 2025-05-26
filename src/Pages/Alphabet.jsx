import React, { useState, useEffect } from 'react';
import NavbarDefault from '../Components/NavbarDefault';
import {
  Card,
  CardBody,
  Typography
} from "@material-tailwind/react";


function Alphabet() {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/alphabet.json");
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);
    return (
        <React.Fragment>
            <NavbarDefault activePage="alphabet" />
            <div className="container my-5">
            <div className="row">
                <div className="col-12 text-center">
                    <Typography variant="h2" className="text-center text-blue-gray-800">Arabic Alphabet</Typography>
                    <div class="border-t border-gray-300 mb-4 mt-2 mx-auto bg-blue-gray-500"></div>
                </div>
                <div className="col-12 flex flex-wrap flex-row-reverse gap-5">
                    {data.map((alphabet) => (
                        <Card>
                            <CardBody className="text-center py-2">
                                <Typography key={alphabet.id} variant="h1" className="arab-font font-normal mb-3">{alphabet.alphabet}</Typography>
                                <Typography key={alphabet.id} variant="small" className="arab-font font-normal">{alphabet.english}</Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
            </div>

        </React.Fragment>
    );
}

export default Alphabet;