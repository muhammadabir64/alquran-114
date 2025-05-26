import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import NavbarDefault from '../Components/NavbarDefault';


function AsmaUlHusna() {

    const table_head = ["#", "Name", "Transliteration", "Meaning"];
    const [table_data, setTable_data] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/asma-ul-husna.json");
            const jsonData = await response.json();
            setTable_data(jsonData);
        }
        fetchData();
    }, []);
    return (
        <React.Fragment>
        <NavbarDefault activePage="asma-ul-husna" />
        <div className="container my-5">
            <Typography
            variant="h2"
            className="text-center text-blue-gray-600"
            >99 Names of Allah</Typography>
            <Typography
            variant="p"
            color="blue-gray"
            className="text-center"
            >The most beautiful names belong to Allah, also known as Asma-ul-Husna.</Typography>
            <table className="w-full table-auto text-center mt-3 mb-5 bg-white shadow-md">
                <thead>
                <tr>
                    {table_head.map((head) => (
                    <th
                        key={head}
                        className="border-b border-blue-dark-100 bg-blue-gray-50 p-4"
                    >
                        <Typography
                        variant="medium"
                        color="blue-gray"
                        className="font-bold leading-none opacity-70"
                        >
                        {head}
                        </Typography>
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {table_data.map(({ id, name, transliteration, meaning }, index) => {
                    const isLast = index === table_data.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        
                    return (
                    <tr key={id}>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                        >
                            {id}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="medium"
                            color="blue-gray-800"
                            className="font-normal arab-font"
                        >
                            {name}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray-800"
                            className="font-normal"
                        >
                            {transliteration}
                        </Typography>
                        </td>
                        <td className={classes}>
                        <Typography
                            variant="small"
                            color="blue-gray-800"
                            className="font-normal"
                        >
                            {meaning}
                        </Typography>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        </React.Fragment>
    );
}

export default AsmaUlHusna;