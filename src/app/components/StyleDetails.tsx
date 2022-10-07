import * as React from 'react';

const StyleDetails = ({setSelectedStyle, style, setStyleAlias, styleAlias}) => {
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
            <h3>{style.name}</h3>
            <h4>{style.id}</h4>
            <p>{style.description}</p>

            <div className="flex">
                <div className="input">
                    <input value={styleAlias} onChange={(e) => setStyleAlias(e.target.value)} />
                </div>
                <div
                    className="action button"
                    onClick={() => {
                        parent.postMessage(
                            {
                                pluginMessage: {
                                    styleAlias: styleAlias,
                                    selectedStyle: style,
                                    type: 'make-style',
                                },
                            },
                            '*'
                        );
                        setSelectedStyle(null);
                        setStyleAlias('');
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export default StyleDetails;
