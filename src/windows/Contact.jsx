import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";
import WindowControll from "#components/WindowControll.jsx";
import { Mail, Send } from "lucide-react";

const Contact = () => {
    return (
        <>
            <div id={"window-header"}>
                <WindowControll target={"contact"}/>
                <h2 className="flex-1 text-center font-bold">Contact</h2>
            </div>

            <div className="contact-content">
                <div className="profile-wrapper">
                    <img src={"/images/adrian.jpg"} alt={"Adrian"} className="profile-img" />
                    <div className="status-dot"></div>
                </div>

                <div className="info">
                    <h3>Adrian Hajdin</h3>
                    <p>Building the next generation of web applications. Let's create something amazing together.</p>
                </div>

                <div className="social-grid">
                    {socials.map(({id, bg, link, icon, text}) => (
                        <a 
                            key={id} 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="social-item"
                            style={{ backgroundColor: bg, color: '#fff' }}
                        >
                            <div className="icon-box bg-white/20">
                                <img src={icon} alt={text} className="brightness-0 invert" />
                            </div>
                            <span>{text}</span>
                        </a>
                    ))}
                </div>

                <a href="mailto:contact@jsmastery.com" className="action-button">
                    <Mail size={18} />
                    <span>Send an Email</span>
                    <Send size={14} className="ml-1 opacity-50" />
                </a>
            </div>
        </>
    )
}
const ContactWindow = WindowWrapper(Contact,"contact");
export default ContactWindow;
