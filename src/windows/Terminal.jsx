import React, { useState, useEffect, useRef } from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { Check, Flag, Terminal as TerminalIcon } from "lucide-react";
import WindowControll from "#components/WindowControll.jsx";
import useWindowStore from "#store/window.js";

const TypingText = ({ text, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            const char = text.charAt(i);
            setDisplayedText((prev) => prev + char);
            i++;
            if (i >= text.length) clearInterval(timer);
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <p>{displayedText}</p>;
};

const Terminal = () => {
    const { windows } = useWindowStore();
    const isOpen = windows.terminal.isOpen;

    const initialHistory = [
        { type: 'output', content: 'text', text: 'Welcome to the portfolio terminal! Type "help" to see available commands.', isNew: true },
        { type: 'command', text: 'show tech-stack' },
        { type: 'output', content: 'techstack' }
    ];

    const [input, setInput] = useState('');
    const [history, setHistory] = useState(initialHistory);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setHistory(initialHistory);
            setInput('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'command', text: input }];

            if (cmd === 'clear') {
                setHistory([]);
            } else if (cmd === 'help') {
                newHistory.push({
                    type: 'output',
                    content: 'text',
                    text: 'Available commands: help, ls, show, clear, whoami, date. Use "ls" or "show" to view the tech stack.',
                    isNew: true
                });
                setHistory(newHistory);
            } else if (cmd === 'ls' || cmd === 'show') {
                newHistory.push({ type: 'output', content: 'techstack' });
                setHistory(newHistory);
            } else if (cmd === 'whoami') {
                newHistory.push({ type: 'output', content: 'text', text: 'Shantharam', isNew: true });
                setHistory(newHistory);
            } else if (cmd === 'date') {
                const dateOptions = { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
                newHistory.push({ 
                    type: 'output', 
                    content: 'text', 
                    text: new Date().toLocaleString('en-US', dateOptions), 
                    isNew: true 
                });
                setHistory(newHistory);
            } else if (cmd !== '') {
                newHistory.push({
                    type: 'output',
                    content: 'text',
                    text: `command not found: ${cmd}. Type "help" for a list of commands.`,
                    isNew: true
                });
                setHistory(newHistory);
            } else {
                setHistory(newHistory);
            }

            setInput('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const renderTechStack = () => (
        <>
            <div className={"label"}>
                <p className={"w-32"}>Category</p>
                <p>Technologies</p>
            </div>

            <ul className={"content"}>
                {techStack.map(({ category, items }) => (
                    <li key={category}>
                        <Check className={"check"} size={20} />
                        <h3>{category}</h3>
                        <ul>
                            {items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <div className={"footnote"}>
                <p>
                    <Check size={20} />
                    {techStack.length} of {techStack.length} stacks loaded successfully
                    (100%)
                </p>

                <p className={"render-time"}>
                    <Flag size={15} fill={"currentColor"} />
                    Render time: 4ms
                </p>
            </div>
        </>
    );

    return (
        <>
            <div id={"window-header"}>
                <WindowControll target={"terminal"} />
                <h2>Terminal — Tech Stack</h2>
            </div>

            <div className={"techstack h-full"} onClick={focusInput} ref={scrollRef}>
                <div className="pb-10">
                    {history.map((item, index) => (
                        <div key={index} className="mb-2">
                            {item.type === 'command' && (
                                <div className={"prompt"}>
                                    <span className={"user"}>shantha@macbook</span>
                                    <span className={"path"}>~ %</span>
                                    <span className={"command"}>{item.text}</span>
                                </div>
                            )}
                            {item.type === 'output' && (
                                <div className="ml-4 text-gray-300">
                                    {item.content === 'techstack' ? renderTechStack() : 
                                     item.isNew ? <TypingText text={item.text} /> : <p>{item.text}</p>}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className={"prompt"}>
                        <span className={"user"}>shantha@macbook</span>
                        <span className={"path"}>~ %</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="bg-transparent border-none outline-none text-white flex-1 caret-white font-roboto"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            autoFocus
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

const TerminalWindow = WindowWrapper(Terminal,"terminal");

export default TerminalWindow;
