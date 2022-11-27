interface IScale {
    draw: string;
    canvas: string;
    scale_x: string;
    scale_y: string;
};

export default class scale {
    private readonly oDraw: HTMLDivElement | any;
    private readonly oCanvas: HTMLDivElement | any;
    private readonly cScaleX: HTMLCanvasElement | any;
    private readonly cScaleY: HTMLCanvasElement | any;
    private readonly oScaleX: HTMLCanvasElement | any;
    private readonly oScaleY: HTMLCanvasElement | any;
    public scaleXW: number = 0;
    public scaleXH: number = 19;
    public scaleYH: number = 0;
    public scaleYW: number = 18;
    public scaleXZ: number = 0;
    public scaleYZ: number = 0;
    constructor({
        draw = '.draw',
        canvas = '.canvas',
        scale_x = '#scale-x',
        scale_y = '#scale-y'
    }: IScale) {
        try {
            this.oDraw = document.querySelector(draw) as HTMLDivElement;
            this.oCanvas = document.querySelector(canvas) as HTMLDivElement;
            this.oScaleX = document.querySelector(scale_x)?.querySelector('canvas') as HTMLCanvasElement;
            this.oScaleY = document.querySelector(scale_y)?.querySelector('canvas') as HTMLCanvasElement;
            this.cScaleX = this.oScaleX.getContext("2d") as
                | CanvasRenderingContext2D
                | any;
            this.cScaleY = this.oScaleY.getContext("2d") as
                | CanvasRenderingContext2D
                | any;
            this.init();
        } catch (error) {
            console.error(error);
        }
    };
    private draw() {
        const {
            cScaleX,
            cScaleY,
            scaleXW,
            scaleYW,
            scaleXH,
            scaleYH,
            scaleXZ,
            scaleYZ,
        } = this;
        if (!cScaleX || !cScaleY) return;
        cScaleX.clearRect(0, 0, scaleXW, scaleXH);
        cScaleY.clearRect(0, 0, scaleYW, scaleYH);
        const scale = 50;
        const loop = (scaleXW / scale) < 25 ? 25 : (scaleXW / scale);
        for (let i = 0; i < 100; i++) {
            cScaleX.beginPath();
            cScaleY.beginPath();
            cScaleY.lineWidth = cScaleX.lineWidth = 0.5;
            if (0 === i) {
                cScaleX.fillStyle = cScaleX.strokeStyle = '#00FFFF';
                cScaleY.fillStyle = cScaleY.strokeStyle = '#00FFFF';
            } else {
                cScaleX.fillStyle = cScaleX.strokeStyle = '#D8D8D8';
                cScaleY.fillStyle = cScaleY.strokeStyle = '#D8D8D8';
            }

            cScaleX.moveTo(scaleXZ + i * scale - 0.5, 0);
            cScaleX.lineTo(scaleXZ + i * scale - 0.5, scaleXH);

            cScaleY.moveTo(0, scaleYZ + i * scale - 0.5);
            cScaleY.lineTo(scaleYW, scaleYZ + i * scale - 0.5);

            cScaleY.moveTo(scaleYW * 0.8, scaleYZ + i * scale + 10 - 0, 5);
            cScaleY.lineTo(scaleYW, scaleYZ + i * scale + 10 - 0.5);

            cScaleY.moveTo(scaleYW * 0.65, scaleYZ + i * scale + 20 - 0, 5);
            cScaleY.lineTo(scaleYW, scaleYZ + i * scale + 20 - 0.5);

            cScaleY.moveTo(scaleYW * 0.8, scaleYZ + i * scale + 30) - 0, 5;
            cScaleY.lineTo(scaleYW, scaleYZ + i * scale + 30 - 0.5);

            cScaleY.moveTo(scaleYW * 0.65, scaleYZ + i * scale + 40 - 0, 5);
            cScaleY.lineTo(scaleYW, scaleYZ + i * scale + 40 - 0.5);

            cScaleX.moveTo(scaleXZ + i * scale - 0.5 + 10, scaleXH * 0.8);
            cScaleX.lineTo(scaleXZ + i * scale - 0.5 + 10, scaleXH);

            cScaleX.moveTo(scaleXZ + i * scale - 0.5 + 20, scaleXH * 0.65);
            cScaleX.lineTo(scaleXZ + i * scale - 0.5 + 20, scaleXH);

            cScaleX.moveTo(scaleXZ + i * scale - 0.5 + 30, scaleXH * 0.8);
            cScaleX.lineTo(scaleXZ + i * scale - 0.5 + 30, scaleXH);

            cScaleX.moveTo(scaleXZ + i * scale - 0.5 + 40, scaleXH * 0.65);
            cScaleX.lineTo(scaleXZ + i * scale - 0.5 + 40, scaleXH);

            cScaleY.font = cScaleX.font = '9px Microsoft YaHei';
            cScaleX.fillText(i * scale, scaleXZ + i * scale + 2, 10);

            (String(i * scale).split('') || []).forEach((item, index) => {
                cScaleY.fillText(item, 3, scaleYZ + i * scale + 9 * (index + 1));
            });

            cScaleX.moveTo(scaleXZ - i * scale - 0.5, 0);
            cScaleX.lineTo(scaleXZ - i * scale - 0.5, scaleXH);

            cScaleY.moveTo(scaleYW * 0.8, scaleYZ - i * scale - 10 - 0.5);
            cScaleY.lineTo(scaleYW, scaleYZ - i * scale - 10 - 0.5);

            cScaleY.moveTo(scaleYW * 0.65, scaleYZ - i * scale - 20 - 0.5);
            cScaleY.lineTo(scaleYW, scaleYZ - i * scale - 20 - 0.5);

            cScaleY.moveTo(scaleYW * 0.8, scaleYZ - i * scale - 30) - 0.5;
            cScaleY.lineTo(scaleYW, scaleYZ - i * scale - 30 - 0.5);

            cScaleY.moveTo(scaleYW * 0.65, scaleYZ - i * scale - 40 - 0.5);
            cScaleY.lineTo(scaleYW, scaleYZ - i * scale - 40 - 0.5);

            cScaleX.moveTo(scaleXZ - i * scale - 0.5 - 10, scaleXH * 0.8);
            cScaleX.lineTo(scaleXZ - i * scale - 0.5 - 10, scaleXH);

            cScaleX.moveTo(scaleXZ - i * scale - 0.5 - 20, scaleXH * 0.65);
            cScaleX.lineTo(scaleXZ - i * scale - 0.5 - 20, scaleXH);

            cScaleX.moveTo(scaleXZ - i * scale - 0.5 - 30, scaleXH * 0.8);
            cScaleX.lineTo(scaleXZ - i * scale - 0.5 - 30, scaleXH);

            cScaleX.moveTo(scaleXZ - i * scale - 0.5 - 40, scaleXH * 0.65);
            cScaleX.lineTo(scaleXZ - i * scale - 0.5 - 40, scaleXH);

            cScaleX.fillText(-i * scale, scaleXZ - i * scale + 2, 9);

            (String(-i * scale).split('') || []).forEach((item, index) => {
                cScaleY.fillText(item, 3, scaleYZ - i * scale + 9 * (index + 1));
            });
            cScaleX.stroke();
            cScaleY.stroke();
        }
    };

    public reset() {
        const { oDraw, oCanvas, oScaleX, oScaleY } = this;
        const width = (window.innerWidth ||
            document.body.clientWidth ||
            document.documentElement.clientWidth
        );
        const heihgt = oScaleY.height = (window.innerHeight ||
            document.body.clientHeight ||
            document.documentElement.clientHeight
        );

        // this.scaleXW = oScaleX.width = oCanvas.offsetWidth > width ? oCanvas.offsetWidth : width;
        // this.scaleYH = oScaleY.height = oCanvas.offsetHeight > heihgt ? oCanvas.offsetHeight : heihgt;

        // this.scaleXW = oScaleX.width = oCanvas.offsetWidth > oDraw.offsetWidth ? oCanvas.offsetWidth : oDraw.offsetWidth;
        // this.scaleYH = oScaleY.height = oCanvas.offsetHeight > oDraw.offsetHeight ? oCanvas.offsetHeight : oDraw.offsetHeight;

        if (oCanvas.offsetWidth > oDraw.offsetWidth) {
            this.scaleXW = oCanvas.offsetWidth;
            this.scaleXZ = oScaleY.width;
            this.oCanvas.style.left = `${this.scaleXZ}px`;
            this.oCanvas.style.transform = `translate(0)`;
        } else {
            this.scaleXW = oDraw.offsetWidth;
            this.scaleXZ = oCanvas.offsetLeft - Math.round(oCanvas.offsetWidth / 2);
            this.oCanvas.style.left = `50%`;
            this.oCanvas.style.transform = `translate(-50%, -50%)`;
        }
        if (oCanvas.offsetHeight > oDraw.offsetHeight) {
            this.scaleYH = oCanvas.offsetHeight;
            this.scaleYZ = oScaleX.height;
            this.oCanvas.style.top = `${this.scaleYZ}px`;
            this.oCanvas.style.transform = `translate(0)`;
        } else {
            this.scaleYH = oDraw.offsetHeight;
            this.scaleYZ = oCanvas.offsetTop - Math.round(oCanvas.offsetHeight / 2);
            this.oCanvas.style.top = `50%`;
            this.oCanvas.style.transform = `translate(-50%, -50%)`;
        }
        this.draw();
    };

    public init() {
        const { oDraw, oScaleX, oScaleY } = this;
        this.scaleXW = oScaleX.width = oDraw.offsetWidth;
        this.scaleXH = oScaleX.height = 19;
        this.scaleYH = oScaleY.height = oDraw.offsetHeight;
        this.scaleYW = oScaleY.width = 18;
        window.onresize = () => {
            this.reset();
        };
        this.reset();
    };
};
