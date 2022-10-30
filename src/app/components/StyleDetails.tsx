import * as React from 'react';
import {BackButton} from './Navigation';
import {DetailsSwatch} from './Swatch';

const StyleDetails = ({setSelectedStyle, style, setStyleAlias, styleAlias, type}) => {
    return (
        <div>
            <BackButton setSelectedStyle={setSelectedStyle} />
            <h3>{style.name}</h3>

            <DetailsSwatch type={type} style={style} />

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
