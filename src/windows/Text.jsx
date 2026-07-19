import React from 'react'
import WindowControll from "#components/WindowControll.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile.data;

    if (!data) return null;

    const { name, image, subtitle, description } = data;

    return (
        <>
            <div id="window-header">
                <WindowControll target="txtfile" />
                <p className="text-sm font-medium text-black/50">{name}</p>
            </div>

            <div className="bg-white p-6 h-full overflow-y-auto">
                <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-10">
                    {image && (
                        <img 
                            src={image} 
                            alt={name} 
                            className="w-full h-auto rounded-lg object-cover shadow-sm"
                        />
                    )}
                    
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-black">{name}</h1>
                        {subtitle && (
                            <p className="text-lg text-black/60 font-medium">{subtitle}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        {description && Array.isArray(description) && description.map((paragraph, index) => (
                            <p key={index} className="text-base text-black/80 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
