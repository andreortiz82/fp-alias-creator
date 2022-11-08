figma.showUI(__html__, {width: 600, height: 600});

async function loadFonts() {
    await figma.loadFontAsync({family: 'Menlo', style: 'Regular'});
    await figma.loadFontAsync({family: 'Menlo', style: 'Bold'});
    await figma.loadFontAsync({family: 'Roboto', style: 'Regular'});
    await figma.loadFontAsync({family: 'Roboto', style: 'Medium'});
    await figma.loadFontAsync({family: 'Roboto', style: 'Bold'});
}

const HelloFigma = () => {
    loadFonts();

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
            value: style.layoutGrids[0].sectionSize,
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

    const LOCAL_STORAGE_SETTINGS = 'alias-creator-settings'; // duplate var from ../components/utils.ts
    figma.clientStorage.getAsync(LOCAL_STORAGE_SETTINGS).then((result) => {
        console.log(result);
        figma.ui.postMessage({
            type: 'fetched-storage',
            message: JSON.parse(result),
        });
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

    if (msg.type === 'save-api-key') {
        console.log(msg.message);
        figma.clientStorage.setAsync(msg.message.localStoreId, JSON.stringify(msg.message.localStoreValue));
    }

    // figma.closePlugin();
};
