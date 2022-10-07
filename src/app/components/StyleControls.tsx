import * as React from 'react';

const StyleControls = ({selectedStyle, setSelectedStyle}: any) => {
    const [styleAlias, setStyleAlias] = React.useState('');
    return (
        <div>
            <div
                className="action"
                onClick={() => {
                    setSelectedStyle(null);
                }}
            >
                Back
            </div>
            <h5 className="font-bold mb-2 text-lg">{selectedStyle.name}</h5>
            <h2 className="mb-2 text-base">{selectedStyle.id}</h2>
            <h3 className="mb-2 text-base">{selectedStyle.type}</h3>
            <p className="mb-2 text-base">{selectedStyle.description}</p>

            <div className="flex">
                <input onChange={(e) => setStyleAlias(e.target.value)} value={styleAlias} />
                <div
                    className="cursor-pointer mb-2 bg-slate-200 inline-block text-blue-600 p-4"
                    onClick={() => {
                        parent.postMessage(
                            {pluginMessage: {styleAlias: styleAlias, selectedStyle: selectedStyle, type: 'make-style'}},
                            '*'
                        );
                    }}
                >
                    {'Save style'}
                </div>
            </div>
        </div>
    );
};

export default StyleControls;
