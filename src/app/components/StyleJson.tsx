import * as React from 'react';
import {rgbToHex, saveFile, copyToClipboard, pushTokensToGh} from '../utils';
import * as _ from 'lodash';

const StyleJson = ({value, localStore}) => {
    const cleanString = (s) => {
        return _.kebabCase(s);
    };

    const configValue = (token) => {
        switch (token.type) {
            case 'colors':
                return rgbToHex(token.paints[0].color);
                break;
            case 'typography':
                return token.value;
                break;
            case 'grid':
                return token.value;
                break;
            case 'effects':
                return token.effects;
                break;
            default:
                return {};
                break;
        }
    };

    const createOutput = (styles) => {
        const output = {base: {}, alias: {}};
        styles.map((token) => {
            const originalStyle = {
                id: token.id,
                name: cleanString(token.name),
                value: configValue(token),
                knownAliases: token.description,
            };
            output.base[originalStyle.name] = {
                id: originalStyle.id,
                value: originalStyle.value,
                type: token.type,
                description: {
                    knownAliases: token.description,
                },
            };

            if (token.description !== '') {
                const knownAliases = token.description.split(',');
                knownAliases.map((alias) => {
                    const newAlias = {name: cleanString(alias), value: `{base.${originalStyle.name}}`};
                    output.alias[newAlias.name] = {
                        value: newAlias.value,
                        type: `${token.type}-alias`,
                        originalStyle: {name: token.name, id: originalStyle.id},
                    };
                });
            }
        });

        return output;
    };

    return (
        <div className="style-output">
            <h1>JSON</h1>
            <p>Save this JSON and proccess it with Style Dictionary.</p>

            <div className="json-output">
                <div className="json-output__actions">
                    <button className="save" onClick={() => saveFile(JSON.stringify(createOutput(value), null, 2))}>
                        Save File
                    </button>

                    <button
                        className="copy secondary"
                        onClick={() => copyToClipboard(JSON.stringify(createOutput(value), null, 2))}
                    >
                        Copy to Clipboard
                    </button>

                    <button
                        className="sync secondary"
                        onClick={() => pushTokensToGh(JSON.stringify(createOutput(value), null, 2), localStore)}
                    >
                        Sync with Github
                    </button>
                </div>

                <textarea readOnly value={JSON.stringify(createOutput(value), null, 2)} />
            </div>
        </div>
    );
};

export default StyleJson;
