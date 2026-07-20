import React from 'react'
import Navbar from "#components/Navbar.jsx";
import Welcome from "#components/Welcome.jsx";
import Dock from "#components/Dock.jsx";
import Terminal from "#windows/Terminal.jsx";
import gsap from "gsap";

import {Draggable} from "gsap/Draggable";
import Safari from "#windows/Safari.jsx";
import Resume from "#windows/Resume.jsx";
import Finder from "#windows/Finder.jsx";
import Text from "#windows/Text.jsx";
import Image from "#windows/Image.jsx";
import Contact from "#windows/Contact.jsx";
import Gallery from "#windows/Gallery.jsx";
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar/>
            <Welcome/>
            <Dock/>
            <Terminal/>
            <Safari/>
            <Resume/>
            <Finder/>
            <Text/>
            <Image/>
            <Contact/>
            <Gallery/>
        </main>
    )
}
export default App
