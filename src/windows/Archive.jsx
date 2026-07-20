import React from 'react'
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import WindowControll from "#components/WindowControll.jsx";
import useWindowStore from "#store/window.js";
import { Trash2 } from "lucide-react";

const Archive = () => {
    const { toggleWindow } = useWindowStore();
    const trash = locations.trash;

    const openItem = (item) => {
        if (item.fileType === 'img') {
            toggleWindow('imgfile', item);
        }
    };

    return (
        <>
            <div id={"window-header"}>
                <WindowControll target={"archive"} />
                <h2 className={"flex-1 text-center font-bold text-sm"}>Archive — Trash</h2>
            </div>

            <div className={"archive-content h-[450px] bg-white flex flex-col"}>
                <div className={"flex-1 p-6 relative"}>
                    {trash.children.length > 0 ? (
                        <ul className={"grid grid-cols-4 gap-6"}>
                            {trash.children.map((item) => (
                                <li
                                    key={item.id}
                                    className={"flex flex-col items-center gap-2 group cursor-pointer"}
                                    onClick={() => openItem(item)}
                                >
                                    <div className={"relative"}>
                                        <img
                                            src={item.icon}
                                            alt={item.name}
                                            className={"size-12 object-contain transition-transform group-hover:scale-110"}
                                        />
                                        <div className={"absolute -top-1 -right-1 bg-red-100 p-1 rounded-full border border-red-200"}>
                                            <Trash2 size={10} className={"text-red-500"} />
                                        </div>
                                    </div>
                                    <p className={"text-xs text-center font-medium text-gray-700 truncate w-20 group-hover:bg-blue-500 group-hover:text-white px-1 rounded transition-colors"}>
                                        {item.name}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className={"flex flex-col items-center justify-center h-full text-gray-400 space-y-2"}>
                            <Trash2 size={48} className={"opacity-20"} />
                            <p>Trash is empty</p>
                        </div>
                    )}
                </div>
                
                <div className={"bg-gray-50 border-t border-gray-100 p-3 flex justify-between items-center text-[10px] text-gray-400"}>
                    <p>{trash.children.length} items</p>
                    <p>Trash Location</p>
                </div>
            </div>
        </>
    )
}

const ArchiveWindow = WindowWrapper(Archive, "archive");
export default ArchiveWindow;
