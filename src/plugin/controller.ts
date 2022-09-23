figma.showUI(__html__, {width: 600, height: 800});

figma.ui.onmessage = (msg) => {
    console.log('msg.type', msg.type);

    if ((msg.type = 'get-styles')) {
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
    }

    if (msg.type === 'create-rectangles') {
        const nodes = [];

        for (let i = 0; i < msg.count; i++) {
            const rect = figma.createRectangle();
            rect.x = i * 150;
            rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
            figma.currentPage.appendChild(rect);
            nodes.push(rect);
        }

        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);

        // This is how figma responds back to the ui
        figma.ui.postMessage({
            type: 'create-rectangles',
            message: `Created ${msg.count} Rectangles`,
            foo: `Food`,
        });
    }

    // figma.closePlugin();
};
