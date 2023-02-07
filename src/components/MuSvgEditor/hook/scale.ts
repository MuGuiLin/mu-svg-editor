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
            scaleXZ,
            scaleYZ,
            oScaleX,
            oScaleY
        } = this;

        if (!cScaleX || !cScaleY) return;
        const gap = 50;

        cScaleX.clearRect(0, 0, oScaleX.width, oScaleX.height);
        cScaleY.clearRect(0, 0, oScaleY.width, oScaleY.height);

        for (let i = 0; i < 200; i++) {
            cScaleY.font = cScaleX.font = '9px Microsoft YaHei';
            cScaleY.lineWidth = cScaleX.lineWidth = 0.5;
            if (0 == i) {
                cScaleX.fillStyle = cScaleX.strokeStyle = cScaleY.fillStyle = cScaleY.strokeStyle = '#00FFFF';
            } else {
                cScaleX.fillStyle = cScaleX.strokeStyle = cScaleY.fillStyle = cScaleY.strokeStyle = '#D8D8D8';
            }
            cScaleX.beginPath();
            // X水平50间负大刻度
            cScaleX.moveTo(scaleXZ - i * gap - 0.5, 0);
            cScaleX.lineTo(scaleXZ - i * gap - 0.5, oScaleX.height);

            // X水平50间的4个负刻度
            cScaleX.moveTo(scaleXZ - i * gap - 0.5 - 10, oScaleX.height * 0.8);
            cScaleX.lineTo(scaleXZ - i * gap - 0.5 - 10, oScaleX.height);

            cScaleX.moveTo(scaleXZ - i * gap - 0.5 - 20, oScaleX.height * 0.65);
            cScaleX.lineTo(scaleXZ - i * gap - 0.5 - 20, oScaleX.height);

            cScaleX.moveTo(scaleXZ - i * gap - 0.5 - 30, oScaleX.height * 0.8);
            cScaleX.lineTo(scaleXZ - i * gap - 0.5 - 30, oScaleX.height);

            cScaleX.moveTo(scaleXZ - i * gap - 0.5 - 40, oScaleX.height * 0.65);
            cScaleX.lineTo(scaleXZ - i * gap - 0.5 - 40, oScaleX.height);

            // X水平50间正大刻度
            cScaleX.moveTo(scaleXZ + i * gap - 0.5, 0);
            cScaleX.lineTo(scaleXZ + i * gap - 0.5, oScaleX.height);

            // X水平50间的4个正刻度
            cScaleX.moveTo(scaleXZ + i * gap - 0.5 + 10, oScaleX.height * 0.8);
            cScaleX.lineTo(scaleXZ + i * gap - 0.5 + 10, oScaleX.height);

            cScaleX.moveTo(scaleXZ + i * gap - 0.5 + 20, oScaleX.height * 0.65);
            cScaleX.lineTo(scaleXZ + i * gap - 0.5 + 20, oScaleX.height);

            cScaleX.moveTo(scaleXZ + i * gap - 0.5 + 30, oScaleX.height * 0.8);
            cScaleX.lineTo(scaleXZ + i * gap - 0.5 + 30, oScaleX.height);

            cScaleX.moveTo(scaleXZ + i * gap - 0.5 + 40, oScaleX.height * 0.65);
            cScaleX.lineTo(scaleXZ + i * gap - 0.5 + 40, oScaleX.height);

            cScaleX.fillText(-i * gap, scaleXZ - i * gap + 2, 9);
            cScaleX.fillText(i * gap, scaleXZ + i * gap + 2, 9);
            cScaleX.stroke();

            cScaleY.beginPath();
            // Y垂直大负刻度
            cScaleY.moveTo(0, scaleYZ - i * gap - 0.5);
            cScaleY.lineTo(oScaleY.width, scaleYZ - i * gap - 0.5);

            // Y垂直50间的4个负刻度
            cScaleY.moveTo(oScaleY.width * 0.8, scaleYZ - i * gap - 10 - 0.5);
            cScaleY.lineTo(oScaleY.width, scaleYZ - i * gap - 10 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.65, scaleYZ - i * gap - 20 - 0.5);
            cScaleY.lineTo(oScaleY.width, scaleYZ - i * gap - 20 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.8, scaleYZ - i * gap - 30) - 0.5;
            cScaleY.lineTo(oScaleY.width, scaleYZ - i * gap - 30 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.65, scaleYZ - i * gap - 40 - 0.5);
            cScaleY.lineTo(oScaleY.width, scaleYZ - i * gap - 40 - 0.5);

            // Y垂直大正刻度
            cScaleY.moveTo(0, scaleYZ + i * gap - 0.5);
            cScaleY.lineTo(oScaleY.width, scaleYZ + i * gap - 0.5);

            // Y垂直50间的4个正刻度
            cScaleY.moveTo(oScaleY.width * 0.8, scaleYZ + i * gap + 10 - 0, 5);
            cScaleY.lineTo(oScaleY.width, scaleYZ + i * gap + 10 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.65, scaleYZ + i * gap + 20 - 0, 5);
            cScaleY.lineTo(oScaleY.width, scaleYZ + i * gap + 20 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.8, scaleYZ + i * gap + 30) - 0, 5;
            cScaleY.lineTo(oScaleY.width, scaleYZ + i * gap + 30 - 0.5);

            cScaleY.moveTo(oScaleY.width * 0.65, scaleYZ + i * gap + 40 - 0, 5);
            cScaleY.lineTo(oScaleY.width, scaleYZ + i * gap + 40 - 0.5);

            (String(i * gap).split('') || []).forEach((item, index) => {
                cScaleY.fillText(item, 3, scaleYZ + i * gap + 9 * (index + 1));
            });
            (String(-i * gap).split('') || []).forEach((item, index) => {
                cScaleY.fillText(item, 3, scaleYZ - i * gap + 9 * (index + 1));
            });
            cScaleY.stroke();
        };
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

        // oScaleX.width = oCanvas.offsetWidth > width ? oCanvas.offsetWidth : width;
        // oScaleY.height = oCanvas.offsetHeight > heihgt ? oCanvas.offsetHeight : heihgt;

        // oScaleX.width = oCanvas.offsetWidth > oDraw.offsetWidth ? oCanvas.offsetWidth : oDraw.offsetWidth;
        // oScaleY.height = oCanvas.offsetHeight > oDraw.offsetHeight ? oCanvas.offsetHeight : oDraw.offsetHeight;

        this.scaleXZ = oScaleY.width;
        this.scaleYZ = oScaleX.height;

        if (oCanvas.offsetWidth >= oDraw.offsetWidth && oCanvas.offsetHeight < oDraw.offsetHeight) {
            console.log(oCanvas.offsetWidth, oDraw.offsetWidth)
            oScaleX.width = oCanvas.offsetWidth + 19;
            this.oCanvas.style.left = `19px`;
            this.oCanvas.style.top = `50%`;
            this.oCanvas.style.transform = `translate(0, -50%)`;
        }
        if (oCanvas.offsetWidth < oDraw.offsetWidth && oCanvas.offsetHeight >= oDraw.offsetHeight) {
            oScaleY.height = oCanvas.offsetHeight + 19;
            this.oCanvas.style.left = `50%`;
            this.oCanvas.style.top = `19px`;
            this.oCanvas.style.transform = `translate(-50%, 0)`;
        }
        if (oCanvas.offsetWidth >= oDraw.offsetWidth && oCanvas.offsetHeight >= oDraw.offsetHeight) {
            oScaleX.width = oCanvas.offsetWidth + 19;
            oScaleY.height = oCanvas.offsetHeight + 19;
            this.oCanvas.style.left = `19px`;
            this.oCanvas.style.top = `19px`;
            this.oCanvas.style.transform = `translate(0)`;
        }
        if (oCanvas.offsetWidth < oDraw.offsetWidth && oCanvas.offsetHeight < oDraw.offsetHeight) {
            oScaleX.width = width;
            oScaleY.height = heihgt;
            this.scaleXZ = oCanvas.offsetLeft - Math.round(oCanvas.offsetWidth / 2);
            this.scaleYZ = oCanvas.offsetTop - Math.round(oCanvas.offsetHeight / 2);
            this.oCanvas.style.left = `50%`;
            this.oCanvas.style.top = `50%`;
            this.oCanvas.style.transform = `translate(-50%, -50%)`;
        }
        this.draw();
    };

    public init() {
        const { oDraw, oScaleX, oScaleY } = this;
        oScaleX.width = oDraw.offsetWidth;
        oScaleX.height = oScaleX.height = 18;
        oScaleY.width = oScaleY.width = 18;
        oScaleY.height = oDraw.offsetHeight;
        window.onresize = () => {
            this.reset();
        };
        this.reset();
    };
};
