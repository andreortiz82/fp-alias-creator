import * as React from 'react';
import {rgbToHex} from '../utils';

const StyleDetails = ({setSelectedStyle, style, setStyleAlias, styleAlias}) => {
    return (
        <div>
            <button
                className="secondary"
                onClick={() => {
                    setSelectedStyle(null);
                }}
            >
                Back
            </button>
            <h3>{style.name}</h3>
            <div className="style-block color-block" style={{background: rgbToHex(style.paints[0].color)}}></div>

            <div>
                <textarea defaultValue={style.description} onChange={(e) => setStyleAlias(e.target.value)} />
                <button
                    onClick={() => {
                        parent.postMessage(
                            {
                                pluginMessage: {
                                    styleAlias: styleAlias,
                                    selectedStyle: style,
                                    type: 'create-alias',
                                },
                            },
                            '*'
                        );
                        setSelectedStyle(null);
                        setStyleAlias('');
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default StyleDetails;
