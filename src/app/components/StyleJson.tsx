import * as React from 'react';
import {rgbToHex, saveFile} from '../utils';

const StyleJson = ({value}) => {
    const cleanString = (s) => {
        return s.trim().replace(' ', '-').toLowerCase();
    };

    const createOutput = (styles) => {
        const output = {base: {}, alias: {}};

        styles.map((color) => {
            const originalColor = {
                id: color.id,
                name: cleanString(color.name),
                value: rgbToHex(color.paints[0].color),
                knownAliases: color.description,
            };
            output.base[originalColor.name] = {
                id: originalColor.id,
                value: originalColor.value,
                type: 'color',
                description: {
                    knownAliases: color.description,
                },
            };

            if (color.description !== '') {
                const knownAliases = color.description.split(',');
                knownAliases.map((alias) => {
                    const aliasColor = {name: cleanString(alias), value: `{base.${originalColor.name}}`};
                    output.alias[aliasColor.name] = {value: aliasColor.value, type: 'color-alias'};
                });
            }
        });

        return output;
    };

    return (
        <div className="style-output">
            <h5>JSON</h5>
            <p>Save this JSON and run it through Style Dictionary.</p>
            <button onClick={() => saveFile(JSON.stringify(createOutput(value), null, 2))}>Save</button>
            <div className="json-output">
                <textarea readOnly value={JSON.stringify(createOutput(value), null, 2)} />
            </div>
        </div>
    );
};

export default StyleJson;
