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
            case 'grid':
                return (
                    <span className={`${type}-swatch list-swatch`} style={{background: 'white'}}>
                        G
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
    const parseWeight = () => {
        if (style.value.fontName.style === 'Regular') return 400;
        if (style.value.fontName.style === 'Medium') return 500;
        if (style.value.fontName.style === 'Bold') return 700;
    };

    const config = (type, style) => {
        switch (type) {
            case 'colors':
                return (
                    <div className={`${type}-block style-swatch`} style={{background: rgbToHex(style.paints[0].color)}}>
                        <span className="hex">{rgbToHex(style.paints[0].color)}</span>
                    </div>
                );
                break;
            case 'typography':
                return (
                    <span
                        className={`${type}-block style-swatch`}
                        style={{
                            fontFamily: `${style.value.fontName.family} !important`,
                            fontSize: style.value.fontSize,
                            fontWeight: parseWeight(),
                            lineHeight: `${style.value.lineHeight.value}px`,
                        }}
                    >
                        How quickly daft jumping zebras vex!
                    </span>
                );
                break;
            case 'grid':
                return (
                    <span className={`${type}-block style-swatch`} style={{background: 'white'}}>
                        Grid
                    </span>
                );
                break;
            case 'effects':
                return (
                    <span className={`${type}-block style-swatch`} style={{background: 'white'}}>
                        Effect
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
