import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Menu {
  title: string;
  src: string;
  path: string;
  gap?: boolean;
}

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);

  const Menus: Menu[] = [
    { title: 'Application', src: 'Chart_fill', path: '/' },
    { title: 'Division', src: 'Chat', path: '/Drivers' },
    { title: 'Region', src: 'folder', path: '/Region' },
    { title: 'Store ', src: 'Calendar',  path: '/Store' },
    // { title: 'Store ', src: 'Calendar',  path: '/Store' ,gap: true},
    // { title: 'Search', src: 'Search',path: '/Drivers'  },
    // { title: 'Analytics', src: 'Chart',path: '/Drivers'  },
    // { title: 'Files ', src: 'Folder', gap: true ,path: '/Drivers' },
    { title: 'Setting', src: 'Setting' ,path: '/Drivers' },
  ];

  return (
    <>
    <div
      className={` ${
        open ? 'w-72' : 'w-20'
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300 mr-3`}
    >
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${
            open && 'rotate-[360deg]'
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && 'scale-0'
          }`}
        >
          Config
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li key={index}>
            <Link
              to={Menu.path}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                index === 0 && 'bg-light-white'
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Sidebar;

