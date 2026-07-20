import React, { useRef } from "react";
import WindowControll from "#components/WindowControll.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    ChevronLeft,
    ChevronRight,
    MoveRight,
    PanelLeft,
    Plus,
    Search,
    Share,
    ShieldHalf,
    LayoutGrid,
} from "lucide-react";
import { blogPosts } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Safari = () => {
    const blogRef = useRef(null);

    useGSAP(() => {
        gsap.from(".blog-post", {
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
        });
    }, { scope: blogRef });

    return (
        <>
            {/* Header */}
            <div id="window-header">
                <div className="flex items-center gap-4">
                    <WindowControll target="safari" />
                    <PanelLeft className="icon ml-2 text-slate-400" />
                </div>

                <div className="flex items-center gap-1">
                    <ChevronLeft className="icon opacity-20 text-slate-400" />
                    <ChevronRight className="icon opacity-20 text-slate-400" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <div className="search">
                        <ShieldHalf className="size-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="shantharam.dev"
                            className="flex-1"
                            readOnly
                        />
                        <Search className="size-4 text-slate-600" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Share className="icon text-slate-400" />
                    <Plus className="icon text-slate-400" />
                    <LayoutGrid className="icon text-slate-400" />
                </div>
            </div>

            {/* Main Content */}
            <div className="blog-container" ref={blogRef}>
                <div className="blog">
                    <div className="blog-header">
                        <h2>Featured Articles</h2>
                        <p>Insights, tutorials, and deep dives into modern web development.</p>
                    </div>

                    <div className="blog-grid">
                        {blogPosts.map(({ id, image, title, date, link }) => (
                            <div key={id} className="blog-post">
                                <div className="post-image-wrapper">
                                    <img
                                        src={image}
                                        alt={title}
                                    />
                                </div>

                                <div className="content">
                                    <div>
                                        <div className="date-tag">{date}</div>
                                        <h3 onClick={() => window.open(link, '_blank')}>
                                            {title}
                                        </h3>
                                    </div>

                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Read Article
                                        <MoveRight size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;