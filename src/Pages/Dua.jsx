import React, { useState, useEffect } from 'react';
import NavbarDefault from '../Components/NavbarDefault';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Typography
} from "@material-tailwind/react";


function Dua() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [duaData, setDuaData] = useState(null);
 
    const handleOpen = (dua) => {
        setDuaData(dua);
        setOpen(!open);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/dua.json");
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);
    return (
        <React.Fragment>
            <NavbarDefault activePage="dua" />
            <div className="container my-5">
            <div className="row">
                <div className="col-12 text-center">
                <Typography variant="h2" className="text-center text-blue-gray-800">Dua/Supplications</Typography>
                <div class="border-t border-gray-300 mb-4 mt-2 mx-auto bg-blue-gray-500"></div>
                </div>
                <div className="col-12 flex flex-wrap gap-5">
                    {data.map((dua) => (
                        <Button key={dua.id} onClick={() => handleOpen(dua)} variant="outlined" className="px-2"><Typography variant="h6" className="text-center text-blue-gray-800">{dua.name}</Typography></Button>
                    ))}
                </div>
                <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                    }}>
                    <DialogHeader className="text-blue-gray-800">{duaData?.name ?? "Loading..."}</DialogHeader>
                    <DialogBody divider className="h-[25rem] overflow-auto">
                        <Typography variant="h6" className="arab-font font-normal text-blue-gray-800" style={{direction: "rtl"}}>{duaData?.arabic ?? "Loading..."}</Typography>
                        <Typography variant="small" className="arab-font font-normal text-blue-gray-800 my-4">{duaData?.transliteration ?? "Loading..."}</Typography>
                        <Typography variant="h6" className="arab-font font-normal text-blue-gray-800">{duaData?.english ?? "Loading..."}</Typography>
                    </DialogBody>
                </Dialog>
            </div>
            </div>
        </React.Fragment>
    );
}

export default Dua;
