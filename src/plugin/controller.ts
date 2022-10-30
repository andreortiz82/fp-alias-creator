figma.showUI(__html__, {width: 700, height: 550});

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
    });

    figma.ui.postMessage({
        type: 'get-styles',
        message: {
            colors: paintCollection,
        },
    });
};

HelloFigma();

figma.ui.onmessage = (msg) => {
    if (msg.type === 'create-alias') {
        const original = figma.getStyleById(msg.selectedStyle.id);
        original.description = msg.styleAlias;
        figma.notify(`Created ${msg.styleAlias} from ${msg.selectedStyle.name}!`);
        HelloFigma();
    }
    // figma.closePlugin();
};
