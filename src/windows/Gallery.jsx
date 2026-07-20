import React, { useState } from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { gallery, photosLinks } from "#constants/index.js";
import WindowControll from "#components/WindowControll.jsx";

const Gallery = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <>
            <div id={"window-header"}>
                <WindowControll target={"photos"}/>
                <h2 className={"flex-1 text-center font-bold text-sm"}>Gallery</h2>
            </div>

            <div className={"flex h-[400px]"}>
                <div className={"sidebar"}>
                    <h2>Photos</h2>
                    <ul>
                        {photosLinks.map(({ id, icon, title }) => (
                            <li
                                key={id}
                                className={activeTab === id ? "active" : "not-active"}
                                onClick={() => setActiveTab(id)}
                            >
                                <img src={icon} alt={title} />
                                <p>{title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={"gallery overflow-y-auto flex-1"}>
                    {activeTab === 1 ? (
                        <ul>
                            {gallery.map(({ id, img }) => (
                                <li key={id}>
                                    <img
                                        src={img}
                                        alt={`Gallery image ${id}`}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"flex items-center justify-center h-full text-gray-400"}>
                            <p>No photos in {photosLinks.find(p => p.id === activeTab)?.title}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const GalleryWindow = WindowWrapper(Gallery, "photos");
export default GalleryWindow;
