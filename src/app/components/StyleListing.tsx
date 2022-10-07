import * as React from 'react';

const {useState} = React;

const StyleListing = ({title, collection, setSelectedStyle}) => {
    const [query, setQuery] = useState('');
    let filtered = collection.filter((color) => {
        if (!color) return true;
        if (color.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
    });

    return (
        <div className="style-collection">
            <h5>{title}</h5>
            <div className="search">
                <input
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                ></input>
            </div>
            <div className="style-collection__list">
                {filtered.map((figmaStyle) => {
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

export default StyleListing;
