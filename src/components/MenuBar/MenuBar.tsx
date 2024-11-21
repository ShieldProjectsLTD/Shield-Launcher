import React, {useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCurrentWindow } from "@tauri-apps/api/window";

import "./MenuBarS.css"
import {window} from "@tauri-apps/api";

export const MenuBar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const closeApp = async (e: any) => {
    e.preventDefault();
    await window?.getCurrentWindow().close();
  }

  const maximizeApp = async (e: any) => {
    e.preventDefault();
    const fullscreen = await window?.getCurrentWindow().isMaximized();
    console.log(fullscreen)
    if(fullscreen) {
      await window?.getCurrentWindow().unmaximize();
    } else {
      await window?.getCurrentWindow().maximize();
    }
  }

  const minimizeApp = async (e: any) => {
    e.preventDefault();
    await window?.getCurrentWindow().minimize();
  }

  const checkFullscreen = async () => {
    const fullscreen = await getCurrentWindow().isMaximized();
    setIsFullscreen(fullscreen);
  };

  useEffect(() => {
    const unlisten = window?.getCurrentWindow().listen<string>('tauri://resize', () => {
      checkFullscreen();
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? "menubar-leading-link menubar-leading-link-active" : "menubar-leading-link";
  };

  return (
    <nav data-tauri-drag-region="" className="menubar">
      <div className="menubar-leading">
        <div className="menubar-leading-logo">
          <img src="/MenuBarLogo.svg" alt="logo"/>
        </div>
        <NavLink className={getNavLinkClass("/")} to="/">
          {t("menubar-leading-menu")}
        </NavLink>
        <NavLink className={getNavLinkClass("/settings")} to="/settings">
          {t("menubar-leading-settings")}
        </NavLink>
        <NavLink className={getNavLinkClass("/help")} to="/help">
          {t("menubar-leading-help")}
        </NavLink>
      </div>




      <div className="menubar-trailing">
        <div className="menubar-trailing-button" id="menubar-minimize" onClick={minimizeApp}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          	<path fill="white" d="M19 13H5v-2h14z" />
          </svg>
        </div>
        <div className="menubar-trailing-button" id="menubar-maximize" onClick={maximizeApp}>
          {
            isFullscreen ?
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                 width="14" height="14" viewBox="0 0 512 512">

              <g transform="translate(0,518) scale(0.1,-0.1) translate(4600,0) rotate(90, 256, 256)"
                fill="#ffffff" stroke="none">
                <path d="M650 5105 c-337 -68 -587 -329 -639 -665 -9 -56 -11 -473 -9 -1605 3
                -1669 -1 -1540 58 -1697 66 -177 261 -372 438 -438 156 -59 34 -55 1742 -55
                1708 0 1586 -4 1742 55 178 66 372 260 438 438 59 156 55 34 55 1742 0 1430
                -1 1570 -17 1625 -29 106 -58 172 -107 247 -114 174 -261 280 -481 346 -50 15
                -189 17 -1605 19 -1251 1 -1563 -1 -1615 -12z m3145 -320 c172 -45 305 -179
                350 -352 23 -86 23 -3020 0 -3106 -45 -173 -178 -307 -350 -352 -52 -13 -244
                -15 -1555 -15 -1311 0 -1503 2 -1555 15 -172 45 -305 179 -350 352 -23 86 -23
                3020 0 3106 45 171 177 306 346 351 84 23 3027 23 3114 1z"/>
                <path d="M4895 3826 c-37 -17 -70 -52 -84 -89 -8 -20 -11 -485 -11 -1511 0
                -1281 -2 -1490 -15 -1539 -41 -159 -145 -274 -308 -340 l-52 -22 -1522 -5
                c-1517 -5 -1522 -5 -1549 -26 -53 -39 -69 -71 -69 -134 0 -63 16 -95 69 -134
                27 -21 28 -21 1559 -21 1672 0 1553 -4 1709 55 178 66 372 260 438 438 59 156
                55 37 55 1709 0 1531 0 1532 -21 1559 -11 15 -32 37 -46 47 -34 25 -113 32
                -153 13z"/>
              </g>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
	           <path fill="white" d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z" />
            </svg>
          }
        </div>
        <div className="menubar-trailing-button" id="menubar-close" onClick={closeApp}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="white" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z"/>
          </svg>
        </div>
      </div>
    </nav>
  );
};