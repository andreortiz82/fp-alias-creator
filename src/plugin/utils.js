export function rGBToHex(rgb) {
    // Borrowed from
    // https://github.com/Ahmad-Amin/figmaPlugin/blob/f27c57245a51248857df4cf278c5599508c517f2/src/class_functions/classes/classes.js
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    //figma gives rgb values in [0,1] we convert it to [1,255]
    r = Math.round(rgb.r * 255);
    g = Math.round(rgb.g * 255);
    b = Math.round(rgb.b * 255);

    //rgb values to hexadecimal values
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return `#${r.toUpperCase() + g.toUpperCase() + b.toUpperCase()}`;
}

// buildObjWithValue('Brand/Dawn/dawn', '#FF7575')
export const buildObjWithValue = (path, value = '') => {
    let paths = path.split('/');
    paths.shift();
    return paths.reduceRight(
        (acc, item, index) => ({
            [item]: index === paths.length - 1 ? {value: value} : acc,
        }),
        {}
    );
};

/* 
reGroup([])
*/
export const reGroup = (array) => {};
