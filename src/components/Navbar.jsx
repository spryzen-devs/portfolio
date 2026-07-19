import React from 'react'
import {navIcons, navLinks} from "#constants/index.js";
import dayjs from "dayjs";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import {locations} from "#constants/index.js";
const Navbar = () => {
    const {toggleWindow} = useWindowStore();
    const {setActiveLocation} = useLocationStore();

    const handleNavClick = (type) => {
        if (type === "finder") {
            const { windows, toggleWindow } = useWindowStore.getState();
            const { activeLocation } = useLocationStore.getState();

            if (windows.finder.isOpen && activeLocation.id === locations.work.id) {
                toggleWindow("finder");
            } else {
                setActiveLocation(locations.work);
                if (!windows.finder.isOpen) {
                    toggleWindow("finder");
                } else {
                    useWindowStore.getState().focusWindow("finder");
                }
            }
        } else {
            toggleWindow(type);
        }
    }

    return (
        <nav>
            <div>
                <img src={"/images/logo.svg"} alt={"logo"}/>
                <p className={"font-bold"}>Shantha's portfolio</p>

                <ul>
                    {navLinks.map(({id,name,type}) => (
                        <li key={id} onClick={() => handleNavClick(type)}>{name}</li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({id,img})=>(
                        <li key={id}>
                            <img src={img} className={"icon-hover"} alt={`icon-${id}`}/>
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format("ddd MMM D h:mm A")}</time>
            </div>
        </nav>
    )
}
export default Navbar
