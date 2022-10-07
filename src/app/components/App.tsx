// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import StyleDetails from './StyleDetails';
import StyleListing from './StyleListing';
import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
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
            if (type === 'send-styles') {
                updateStyles(message);
            }
        };
    }, []);

    const currentView = (style) => {
        if (style === null) {
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
