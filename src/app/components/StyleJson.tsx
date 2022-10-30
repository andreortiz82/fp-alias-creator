import * as React from 'react';
import {rgbToHex, saveFile} from '../utils';
import * as _ from 'lodash';

const StyleJson = ({value}) => {
    const cleanString = (s) => {
        return s.trim().replace(' ', '-').toLowerCase();
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
                return token.layoutGrids;
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
        // console.log(styles)
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
                    output.alias[newAlias.name] = {value: newAlias.value, type: `${token.type}-alias`};
                });
            }
        });

        return output;
    };

    return (
        <div className="style-output">
            <h1>JSON</h1>
            <p>Save this JSON and proccess it with Style Dictionary.</p>
            <button className="secondary" onClick={() => saveFile(JSON.stringify(createOutput(value), null, 2))}>
                Save
            </button>
            <div className="json-output">
                <textarea readOnly value={JSON.stringify(createOutput(value), null, 2)} />
            </div>
        </div>
    );
};

export default StyleJson;
