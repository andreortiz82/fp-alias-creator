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
    console.log('msg.type', msg.type);

    if ((msg.type = 'get-style')) {
        console.log('msg.message', msg.message);
    }

    // figma.closePlugin();
};
