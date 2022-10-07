import * as React from 'react';

const StyleListing = ({title, collection, setSelectedStyle}: any) => {
    return (
        <div>
            <h5 className="font-bold mb-2 text-lg">{title}</h5>
            <div className="max-h-80 overflow-auto">
                {collection.map((figmaStyle) => {
                    return (
                        <div
                            className="flex justify-between p-4 bg-slate-200 mb-1 text-blue-600 cursor-pointer"
                            onClick={() => {
                                setSelectedStyle(figmaStyle);
                                parent.postMessage({pluginMessage: {type: 'get-style', message: figmaStyle}}, '*');
                            }}
                            key={figmaStyle.id}
                        >
                            {figmaStyle}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StyleListing;
