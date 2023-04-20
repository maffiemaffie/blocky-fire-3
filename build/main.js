import { CellRenderer } from "../node_modules/cell-renderer/dist/esm/index.js";
import { OctaveNoise } from "../node_modules/maffie-noise/dist/index.js";
import { Clock } from "./clock.js";
class FireDrawer {
    constructor() {
        this.noise = new OctaveNoise(3, 4, 7);
        this.fireSize = 0.75;
        this.fireSpeed = 0.02;
        this.noiseScale = 0.1;
        this.timeScale = 0.0015;
        this.time = 0;
    }
    setup(sender, _args) {
        sender.fill('black');
    }
    draw(_sender, args) {
        const { ctx, x, y, rows, cols } = args;
        // get octaveNoise from x and y position; fire rises
        const NOISE_VAL = this.noise.get(x * this.noiseScale - 500, (y + this.fireSpeed * this.time) * this.noiseScale, this.time * this.timeScale);
        // squares shrink as they rise
        const HEIGHT_FACTOR = Math.max(this.map(y, 0, rows, 0.5, 5), 0);
        // squares are larger closer to the center
        const WIDTH_FACTOR = Math.max(this.map(Math.abs(x - cols * 0.5), 0, cols * 0.5, 1.5, 0), 0);
        // define size of each square according to its position
        const SQUARE_SIZE = this.map(NOISE_VAL, 0, 1, -0.2, 1) * this.fireSize * HEIGHT_FACTOR * WIDTH_FACTOR;
        // Brightness is controlled by the same factors as scale
        const RED = 250;
        const GREEN = NOISE_VAL * this.map(y, 0, rows, 0, 225);
        const BLUE = NOISE_VAL * this.map(y, 0, rows, 0, 75);
        const ALPHA = NOISE_VAL * this.map(y, 0, rows, 0, 1.5);
        ctx.fillStyle = `rgba(${RED}, ${GREEN}, ${BLUE}, ${ALPHA}`;
        ctx.fillRect(-SQUARE_SIZE, -SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    }
    map(val, fromMin, fromMax, toMin, toMax) {
        return (val - fromMin) / (fromMax - fromMin) * (toMax - toMin) + toMin;
    }
}
(() => {
    const container = document.querySelector('#fire-container');
    const renderer = new CellRenderer.Renderer(20);
    container.appendChild(renderer.canvas);
    // resize canvas
    const fireDrawer = new FireDrawer();
    // renderer.draw(fireDrawer);
    const clock = new Clock();
    clock.addInterval((args) => {
        fireDrawer.time = args.now;
        renderer.draw(fireDrawer);
    });
})();
