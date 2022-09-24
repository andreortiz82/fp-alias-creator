// import * as React from 'react';
import React, {useState, useEffect} from 'react';

import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
    const [colorStyles, setColorStyles] = useState([]);
    const [typographyStyles, setTypographyStyles] = useState([]);
    const [gridStyles, setGridStyles] = useState([]);
    const [efxStyles, setEfxStyles] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);

    const getStyles = () => {
        parent.postMessage({pluginMessage: {type: 'get-styles'}}, '*');
    };

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

    const Listing = ({title, collection}) => {
        return (
            <div className="style-collection">
                <h5>{title}</h5>
                <div className="style-collection__list">
                    {collection.map((figmaStyle) => {
                        return (
                            <div className="style-collection__item" key={figmaStyle.id}>
                                {figmaStyle.name}

                                <div
                                    className="style-collection__item__action"
                                    onClick={() => {
                                        setSelectedStyle(figmaStyle);
                                        parent.postMessage(
                                            {pluginMessage: {type: 'get-style', message: figmaStyle}},
                                            '*'
                                        );
                                    }}
                                >
                                    Get details
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const CurrentView = ({style}) => {
        if (style === null) {
            return (
                <div>
                    <Listing title="Colors" collection={colorStyles} />
                    <Listing title="Typography" collection={typographyStyles} />
                    <Listing title="Grid" collection={gridStyles} />
                    <Listing title="Effects" collection={efxStyles} />
                </div>
            );
        } else {
            return (
                <div>
                    <div
                        onClick={() => {
                            setSelectedStyle(null);
                        }}
                    >
                        Back
                    </div>
                    <h1>{style.name}</h1>
                    <h2>{style.id}</h2>
                </div>
            );
        }
    };

    return (
        <div>
            <CurrentView style={selectedStyle} />
        </div>
    );
};

export default App;
