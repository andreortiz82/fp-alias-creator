figma.showUI(__html__, {width: 450, height: 500});

const HelloFigma = () => {
    const paintCollection = [];
    const typographyCollection = [];
    const gridCollection = [];
    const effectsCollection = [];

    figma.getLocalPaintStyles().forEach((style) => {
        paintCollection.push({
            type: 'colors',
            name: style.name,
            id: style.id,
            description: style.description,
            paints: style.paints,
        });
    });

    figma.getLocalTextStyles().forEach((style) => {
        console.log(style);

        typographyCollection.push({
            type: 'typography',
            name: style.name,
            id: style.id,
            description: style.description,
            value: {
                fontName: style.fontName,
                fontSize: style.fontSize,
                letterSpacing: style.letterSpacing,
                lineHeight: style.lineHeight,
                paragraphIndent: style.paragraphIndent,
                paragraphSpacing: style.paragraphSpacing,
                textCase: style.textCase,
                textDecoration: style.textDecoration,
            },
        });
    });

    figma.getLocalGridStyles().forEach((style) => {
        gridCollection.push({
            type: 'grid',
            name: style.name,
            id: style.id,
            description: style.description,
            layoutGrids: style.layoutGrids,
        });
    });

    figma.getLocalEffectStyles().forEach((style) => {
        effectsCollection.push({
            type: 'effects',
            name: style.name,
            id: style.id,
            description: style.description,
            effects: style.effects,
        });
    });

    figma.ui.postMessage({
        type: 'get-styles',
        message: {
            colors: paintCollection,
            typography: typographyCollection,
            grid: gridCollection,
            effects: effectsCollection,
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
