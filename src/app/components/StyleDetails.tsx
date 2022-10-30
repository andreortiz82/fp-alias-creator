import * as React from 'react';
import {BackButton} from './Navigation';
import {DetailsSwatch} from './Swatch';

const StyleDetails = ({setSelectedStyle, style, setStyleAlias, styleAlias, type}) => {
    React.useEffect(() => {
        setStyleAlias(style.description);
    }, []);

    return (
        <div>
            <BackButton setSelectedStyle={setSelectedStyle} />
            <h2>{style.name}</h2>

            <DetailsSwatch type={type} style={style} />

            <div className="alias-form">
                <div className="alias-form__field">
                    <textarea
                        placeholder="Example: apple, banana, peanutbutter"
                        defaultValue={style.description}
                        onChange={(e) => setStyleAlias(e.target.value)}
                    />
                    <p>Use a comma separated list to define aliases for this style.</p>
                </div>
                <button
                    onClick={() => {
                        if (styleAlias === '') {
                            alert('Enter an alias before saving');
                        } else {
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
                        }
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default StyleDetails;
