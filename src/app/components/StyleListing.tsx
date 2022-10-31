import * as React from 'react';
import {MiniSwatch} from './Swatch';
import * as _ from 'lodash';

const {useState} = React;

const StyleListing = ({collection, setSelectedStyle, type}) => {
    const [query, setQuery] = useState('');
    let filtered = collection.filter((item) => {
        if (!item) return true;
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
    });

    return (
        <div className={`${type}-collection style-collection`}>
            <h1>{_.startCase(type)}</h1>
            <div className="search">
                <input
                    placeholder="Search styles"
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                ></input>
            </div>
            <div className="style-collection__list">
                {filtered.map((style) => {
                    return (
                        <div
                            className="style-collection__item"
                            key={style.id}
                            onClick={() => {
                                setSelectedStyle(style);
                                parent.postMessage({pluginMessage: {type: 'get-style', message: style}}, '*');
                            }}
                        >
                            <span className="style-collection__item-block">
                                <div className="identifier">
                                    <span>
                                        <MiniSwatch type={type} style={style} />
                                    </span>
                                    <span>
                                        <div>{_.kebabCase(style.name)}</div>
                                        {style.description ? (
                                            <div className="known-alias">{style.description}</div>
                                        ) : null}
                                    </span>
                                </div>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StyleListing;
