// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const Listing = ({title, collection, setSelectedStyle}) => {
    return (
        <div className="style-collection">
            <h5>{title}</h5>
            <div className="style-collection__list">
                {collection.map((figmaStyle) => {
                    return (
                        <div
                            className="style-collection__item action"
                            key={figmaStyle.id}
                            onClick={() => {
                                setSelectedStyle(figmaStyle);
                                parent.postMessage({pluginMessage: {type: 'get-style', message: figmaStyle}}, '*');
                            }}
                        >
                            {figmaStyle.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const AliasForm = ({setSelectedStyle, style, setStyleAlias, styleAlias}) => {
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

const App = ({}) => {
    const [colorStyles, setColorStyles] = useState([]);
    const [typographyStyles, setTypographyStyles] = useState([]);
    const [gridStyles, setGridStyles] = useState([]);
    const [efxStyles, setEfxStyles] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [styleAlias, setStyleAlias] = React.useState('');

    const updateStyles = (message) => {
        setColorStyles(message.colors);
        setTypographyStyles(message.text);
        setGridStyles(message.grid);
        setEfxStyles(message.efx);
    };

    useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'send-styles') {
                updateStyles(message);
            }
        };
    }, []);

    const currentView = (style) => {
        if (style === null) {
            return (
                <div>
                    <Listing setSelectedStyle={setSelectedStyle} title="Colors" collection={colorStyles} />
                    <Listing setSelectedStyle={setSelectedStyle} title="Typography" collection={typographyStyles} />
                    <Listing setSelectedStyle={setSelectedStyle} title="Grid" collection={gridStyles} />
                    <Listing setSelectedStyle={setSelectedStyle} title="Effects" collection={efxStyles} />
                </div>
            );
        } else {
            return (
                <div>
                    <AliasForm
                        styleAlias={styleAlias}
                        setSelectedStyle={setSelectedStyle}
                        style={style}
                        setStyleAlias={setStyleAlias}
                    />
                </div>
            );
        }
    };

    return <div>{currentView(selectedStyle)}</div>;
};

export default App;
