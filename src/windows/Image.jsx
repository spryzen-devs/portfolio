import React from 'react'
import WindowControll from "#components/WindowControll.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile.data;

    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header">
                <WindowControll target="imgfile" />
                <p className="text-sm font-medium text-black/50">{name}</p>
            </div>

            <div className="bg-white h-full overflow-hidden flex items-center justify-center p-4">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={name}
                        className="max-w-full max-h-full object-contain shadow-md rounded-sm"
                    />
                ) : (
                    <p className="text-black/40">No image available</p>
                )}
            </div>
        </>
    );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
