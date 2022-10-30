// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import StyleDetails from './StyleDetails';
import StyleListing from './StyleListing';
import StyleJson from './StyleJson';
import {Navigation} from './Navigation';

declare function require(path: string): any;

const App = ({}) => {
    const [currentTab, setCurrentTab] = useState('colors');

    const [colorStyles, setColorStyles] = useState([]);
    const [typographyStyles, setTypographyStyles] = useState([]);
    const [gridStyles, setGridStyles] = useState([]);
    const [effectsStyles, setEffectsStyles] = useState([]);

    const [selectedStyle, setSelectedStyle] = useState(null);
    const [styleAlias, setStyleAlias] = React.useState('');

    const updateStyles = (message) => {
        setColorStyles(message.colors);
        setTypographyStyles(message.typography);
        setGridStyles(message.grid);
        setEffectsStyles(message.effects);
    };

    useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'get-styles') {
                updateStyles(message);
            }
        };
    }, []);

    const renderStyleView = (collection, view) => {
        if (selectedStyle === null) {
            return (
                <div>
                    <StyleListing setSelectedStyle={setSelectedStyle} type={view} collection={collection} />
                </div>
            );
        } else {
            return (
                <div>
                    <StyleDetails
                        styleAlias={styleAlias}
                        setSelectedStyle={setSelectedStyle}
                        style={selectedStyle}
                        setStyleAlias={setStyleAlias}
                        type={view}
                    />
                </div>
            );
        }
    };

    const currentView = (view) => {
        switch (view) {
            case 'colors':
                return renderStyleView(colorStyles, view);
                break;
            case 'typography':
                return renderStyleView(typographyStyles, view);
                break;
            case 'grid':
                return renderStyleView(gridStyles, view);
                break;
            case 'effects':
                return renderStyleView(effectsStyles, view);
                break;
            default:
                return <StyleJson value={[...colorStyles, ...typographyStyles, ...gridStyles, ...effectsStyles]} />;
                break;
        }
    };

    return (
        <div>
            {selectedStyle === null ? <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} /> : null}
            <div>{currentView(currentTab)}</div>
        </div>
    );
};

export default App;
