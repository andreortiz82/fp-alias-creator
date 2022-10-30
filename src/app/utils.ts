export const rgbToHex = (rgb) => {
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
};

export const saveFile = (content) => {
    // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
    let date = new Date();
    let fileName = `tokens.${date[Symbol.toPrimitive]('number')}.json`;

    var a = document.createElement('a');
    var file = new Blob([content], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};
