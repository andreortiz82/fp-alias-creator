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

    const currentView = (view) => {
        switch (view) {
            case 'colors':
                return <StyleListing setSelectedStyle={setSelectedStyle} title="Colors" collection={colorStyles} />;
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
            <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div>{currentView(currentTab)}</div>
        </div>
    );
};

export default App;

/*

<div>
    <StyleDetails
        styleAlias={styleAlias}
        setSelectedStyle={setSelectedStyle}
        style={style}
        setStyleAlias={setStyleAlias}
    />
</div>

*/
