import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  IconButton,
  MobileNav,
  Navbar,
  Typography,
  Progress
} from "@material-tailwind/react";
import useProgress from '../hooks/useProgress';
import { GITHUB_REPO } from "../env";


function NavbarDefault({ activePage }) {
  const [openNav, setOpenNav] = useState(false);
  const progressValue = useProgress();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={activePage === 'asma-ul-husna' ? 'p-1 font-normal active_page' : 'p-1 font-normal'}
      >
        <Link to="/asma-ul-husna" className="flex items-center">
          Asma-ul-Husna
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={activePage === 'surah' ? 'p-1 font-normal active_page' : 'p-1 font-normal'}
      >
        <Link to="/surah" className="flex items-center">
          Al-Quran
        </Link>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={activePage === 'dua' ? 'p-1 font-normal active_page' : 'p-1 font-normal'}
      >
        <Link to="/dua" className="flex items-center">
          Dua
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={activePage === 'alphabet' ? 'p-1 font-normal active_page' : 'p-1 font-normal'}
      >
        <Link to="/alphabet" className="flex items-center">
          Alphabet
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className={activePage === 'api' ? 'p-1 font-normal active_page' : 'p-1 font-normal'}
      >
        <Link to="/api" className="flex items-center">
          API
        </Link>
      </Typography>

    </ul>
  );
  return (
    <React.Fragment>
    <Progress value={progressValue} size="sm" color="green" className="h-0.5" />
    <Navbar className="mx-auto max-w-screen-xl pt-3 pb-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex justify-between text-blue-gray-900">
        <Typography
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 font-bold arab-font"
        >
          <Link to="/"><i class="fas fa-quran"></i> AlQuran-114</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div>
          <Typography
          as="li"
          variant="medium"
          color="blue-gray"
          className="p-1 font-normal"
          >
            <Link to={GITHUB_REPO} className="mr-3" target="_blank"><i className="fab fa-github"></i></Link>
          </Typography>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
        </div>
      </MobileNav>
    </Navbar>
    </React.Fragment>
  );
}

export default NavbarDefault;