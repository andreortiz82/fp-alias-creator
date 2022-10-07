figma.showUI(__html__, {width: 600, height: 600});

const HelloFigma = () => {
    const paintCollection = [];
    const typeCollection = [];
    const gridCollection = [];
    const efxCollection = [];
    figma
        .getLocalPaintStyles()
        .forEach((style) => paintCollection.push({name: style.name, id: style.id, description: style.description}));
    figma
        .getLocalTextStyles()
        .forEach((style) => typeCollection.push({name: style.name, id: style.id, description: style.description}));
    figma
        .getLocalGridStyles()
        .forEach((style) => gridCollection.push({name: style.name, id: style.id, description: style.description}));
    figma
        .getLocalEffectStyles()
        .forEach((style) => efxCollection.push({name: style.name, id: style.id, description: style.description}));
    figma.ui.postMessage({
        type: 'send-styles',
        message: {
            colors: paintCollection,
            text: typeCollection,
            grid: gridCollection,
            efx: efxCollection,
        },
    });
};

HelloFigma();

figma.ui.onmessage = (msg) => {
    console.log('msg', msg);

    if (msg.type === 'make-style') {
        const original = figma.getStyleById(msg.selectedStyle.id);
        const style = figma.createPaintStyle();
        style.name = `aliases/${msg.styleAlias}`;
        style.paints = original.paints;
        style.description = original.id;
    }

    // figma.closePlugin();
};
