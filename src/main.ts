import * as CellRenderer from "../node_modules/cell-renderer/dist/esm/cell-renderer.js";

(() => {
    // noise :weary:

    const container:HTMLDivElement = document.querySelector('#fire-container')!;
    const renderer = new CellRenderer.Renderer(50);
    // resize canvas

    const fireDrawer:CellRenderer.Drawer = {
        setup: function(sender:CellRenderer.Renderer, args:CellRenderer.DrawArgs) {
            sender.fill('black');
        },
        draw: function(sender:CellRenderer.Renderer, args:CellRenderer.DrawArgs) {
            const {ctx, x, y, rows, cols} = args;
            
        }
    }
})();