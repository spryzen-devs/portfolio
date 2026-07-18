import React from "react";
import WindowControll from "#components/WindowControll.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    MoveRight,
    PanelLeft,
    Plus,
    Search,
    Share,
    ShieldHalf,
} from "lucide-react";
import { blogPosts } from "#constants/index.js";

const Safari = () => {
    return (
        <>
            {/* Header */}
            <div id="window-header">
                <WindowControll target="safari" />

                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className="icon" />

                    <div className="search">
                        <Search className="icon" />
                        <input
                            type="text"
                            placeholder="Search website name"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>
            </div>

            {/* Main Content */}
            <div className="blog">
                <h2>My Developer Blog</h2>

                <div className="space-y-8">
                    {blogPosts.map(({ id, image, title, date, link }) => (
                        <div key={id} className="blog-post">
                            <div className="col-span-2">
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="content">
                                <p className="text-sm text-gray-500">{date}</p>

                                <h3 className="font-semibold text-lg">
                                    {title}
                                </h3>

                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 mt-3 hover:underline"
                                >
                                    Check out the full post
                                    <MoveRight className="icon-hover" size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;