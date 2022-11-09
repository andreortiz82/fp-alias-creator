import * as React from 'react';
import {BackButton} from './Navigation';
import {DetailsSwatch} from './Swatch';
import * as _ from 'lodash';

const StyleDetails = ({setSelectedStyle, style, setStyleAlias, styleAlias, type}) => {
    React.useEffect(() => {
        setStyleAlias(style.description);
    }, []);

    return (
        <div>
            <div className="style-details__title">
                <BackButton setSelectedStyle={setSelectedStyle} />
                <h2>{style.name}</h2>
            </div>
            <p className="style-details__token">{_.kebabCase(style.name)}</p>

            <DetailsSwatch type={type} style={style} />

            <div className="alias-form">
                <div className="alias-form__field">
                    <textarea
                        placeholder="one, two, three"
                        value={styleAlias}
                        onChange={(e) => setStyleAlias(e.target.value)}
                    />
                    <p>Use a comma separated list to define aliases for this style.</p>
                </div>

                <div className="alias-form__actions">
                    <button
                        className="secondary"
                        onClick={() => {
                            setSelectedStyle(null);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={styleAlias === '' ? true : false}
                        className="secondary clear"
                        onClick={() => {
                            const shouldClear = confirm('Whow! This will clear all tokens for this style.');
                            if (shouldClear) {
                                setStyleAlias('');
                            }
                        }}
                    >
                        Clear all aliases
                    </button>
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
        </div>
    );
};

export default StyleDetails;
