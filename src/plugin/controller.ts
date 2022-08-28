figma.showUI(__html__, {width: 300, height: 600});

let textLayers = [];
let allLayers = [];
let selection = figma.currentPage.selection;

figma.on('selectionchange', () => {
    // getSelections();
});

const getSelections = () => {
    selection = figma.currentPage.selection;
    textLayers = [];
    allLayers = [];
    lookingForText(selection);
    console.log('text layers: ' + textLayers);
    console.log('all layers: ' + allLayers);
    figma.ui.postMessage({
        type: 'selection',
        message: {
            textLayers: textLayers,
        },
    });
};

//recursion function look for text layers in the selection and selection children
const lookingForText = (element) => {
    console.log(element);
    //if element is array, then loop through element
    if (Array.isArray(element)) {
        console.log(1);
        element.forEach((element) => {
            lookingForText(element);
        });
    } else {
        //if element is a text layer, then return the text
        if (element.type === 'TEXT') {
            console.log(2);
            textLayers.push({
                id: element.id,
                name: element.name,
                value: element.characters,
            });
            allLayers.push(element);
        } else if (element.children !== undefined && element.children.length > 0) {
            console.log(3);
            lookingForText(element.children);
        } else if (element.children === undefined) {
            console.log(4);
            allLayers.push(element);
        }
    }
};

figma.ui.onmessage = (msg) => {
    if (msg.type === 'run') {
        getSelections();
    }

    if (msg.type === 'overwrite') {
        // console.log(msg.newObj)
        const updated = msg.result;
        //find the current page for node with updated[i].id, then change the text to updated[i].value
        updated.forEach((element) => {
            // const node = figma.currentPage.findOne(node => node.id === element.id)
            //element id = all layers id
            const node = allLayers.find((node) => node.id === element.id);
            console.log('overwriting...');
            figma.loadFontAsync({family: node.fontName.family, style: node.fontName.style}).then(() => {
                node.characters = element.value;
            });
        });
    }
    // figma.closePlugin();
};
