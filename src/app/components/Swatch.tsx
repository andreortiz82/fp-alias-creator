import * as React from 'react';
import {rgbToHex} from '../utils';

const MiniSwatch = ({type, style}) => {
    const config = (type, style) => {
        switch (type) {
            case 'colors':
                return (
                    <span
                        className={`${type}-swatch list-swatch`}
                        style={{background: rgbToHex(style.paints[0].color)}}
                    ></span>
                );
                break;
            case 'typography':
                return (
                    <span className={`${type}-swatch list-swatch`} style={{background: 'white'}}>
                        T
                    </span>
                );
                break;
            case 'sizes':
                return (
                    <span className={`${type}-swatch list-swatch`} style={{background: 'white'}}>
                        S
                    </span>
                );
                break;
            case 'effects':
                return (
                    <span className={`${type}-swatch list-swatch`} style={{background: 'white'}}>
                        E
                    </span>
                );
                break;
            default:
                return null;
                break;
        }
    };

    return <div>{config(type, style)}</div>;
};

const DetailsSwatch = ({type, style}) => {
    const config = (type, style) => {
        switch (type) {
            case 'colors':
                return (
                    <div
                        className={`${type}-block style-swatch`}
                        style={{background: rgbToHex(style.paints[0].color)}}
                    ></div>
                );
                break;
            case 'typography':
                return (
                    <span className={`${type}-block style-swatch`} style={{background: 'white'}}>
                        T
                    </span>
                );
                break;
            case 'sizes':
                return (
                    <span className={`${type}-block style-swatch`} style={{background: 'white'}}>
                        S
                    </span>
                );
                break;
            case 'effects':
                return (
                    <span className={`${type}-block style-swatch`} style={{background: 'white'}}>
                        E
                    </span>
                );
                break;
            default:
                return null;
                break;
        }
    };

    return <div>{config(type, style)}</div>;
};

export {MiniSwatch, DetailsSwatch};
