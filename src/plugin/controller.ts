figma.showUI(__html__, {width: 400, height: 600});

const HelloFigma = () => {
    const paintCollection = [];

    figma.getLocalPaintStyles().forEach((style) => {
        paintCollection.push({
            type: 'color',
            name: style.name,
            id: style.id,
            description: style.description,
            paints: style.paints,
        });
        // console.log(style)
    });

    figma.ui.postMessage({
        type: 'send-styles',
        message: {
            colors: paintCollection,
        },
    });
};

HelloFigma();

figma.ui.onmessage = (msg) => {
    if (msg.type === 'make-style') {
        if (original.type === 'PAINT') {
            const original = figma.getStyleById(msg.selectedStyle.id);
            const style = figma.createPaintStyle();
            style.paints = original.paints;
            style.name = `_TEMP/${msg.styleAlias}`;
            style.description = original.id;
        }
    }
    // figma.closePlugin();
};
