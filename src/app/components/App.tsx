// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import StyleDetails from './StyleDetails';
import StyleListing from './StyleListing';
import StyleJson from './StyleJson';
import Navigation from './Navigation';

declare function require(path: string): any;

const App = ({}) => {
    const [currentTab, setCurrentTab] = useState('colors');
    const [colorStyles, setColorStyles] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [styleAlias, setStyleAlias] = React.useState('');

    const updateStyles = (message) => {
        setColorStyles(message.colors);
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

    const renderStyleView = () => {
        if (selectedStyle === null) {
            return (
                <div>
                    <StyleListing setSelectedStyle={setSelectedStyle} title="Colors" collection={colorStyles} />
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
                    />
                </div>
            );
        }
    };

    const currentView = (view) => {
        switch (view) {
            case 'colors':
                return renderStyleView();
                break;
            case 'typography':
                return <div>{view}</div>;
                break;
            case 'sizes':
                return <div>{view}</div>;
                break;
            case 'effects':
                return <div>{view}</div>;
                break;
            default:
                return <StyleJson value={colorStyles} />;
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

/*



*/
