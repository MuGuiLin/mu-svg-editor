export { default as operate } from './operate';
export { default as scale } from './scale';


/**
 * 生成uuid
 */
const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16);
};
export function uuid(): string {
    let uuid = '';
    for (let i = 1; i <= 18; i++) {
        if (i === 9 || i === 14 || i === 19 || i === 24) {
            uuid += '-';
        } else if (i === 15) {
            uuid += 4;
        } else if (i === 20) {
            uuid += hexList[(Math.random() * 4) | 8];
        } else {
            uuid += hexList[(Math.random() * 16) | 0];
        }
    }
    return uuid.replace(/-/g, '');
};

/**
 * 检测对象是否为空
 * @param obj 
 * @returns 
 */
export function isEmptyObj(obj: {}): boolean {
    try {
        return JSON.stringify(obj) === '{}';
    } catch (error) {
        return 0 === (Object.keys(obj) || Object.getOwnPropertyNames(obj)).length;
    }
};

/**
 * 获取鼠标在DOM中的位置
 * @param target 
 * @param event 
 * @returns 
 */
export function getMousePos(target: Element, event: MouseEvent): Array<number> {
    const { clientX, clientY } = event;

    // 获取DOM元素的边界 // 核心方法：getBoundingClientRect()  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const { left, top } = target.getBoundingClientRect();

    //计算鼠标在DOM中的位置
    return [
        clientX - left,
        clientY - top
    ];
};

/**
 * 获取Base64图片
 * @param img 
 * @param callback 
 */
export function getImageBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

/**
 * 获取坐标象限
 * @param x 
 * @param y 
 */
export function getQuadrant(x: number, y: number): Array<number> {
    const [r, angle] = [Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), Math.atan(y / x) * 180 / Math.PI];
    let rx = 0, ry = 0;
    if (x > 0 && y > 0 && angle >= 22.5 && angle < 67.5) {
        rx = r * Math.cos(45 * (Math.PI / 180));
        ry = r * Math.sin(45 * (Math.PI / 180));
    }
    else if ((y >= 0 && angle >= 67.5) || (y >= 0 && angle < -67.5)) {
        rx = r * Math.cos(90 * (Math.PI / 180));
        ry = r * Math.sin(90 * (Math.PI / 180));

    } else if (x < 0 && y > 0 && angle <= -22.5 && angle > -67.5) {
        rx = r * Math.cos(135 * (Math.PI / 180));
        ry = r * Math.sin(135 * (Math.PI / 180));

    } else if ((x <= 0 && y > 0 && angle >= -22.5) || (x <= 0 && y < 0 && angle < 22.5)) {
        rx = r * Math.cos(180 * (Math.PI / 180));
        ry = r * Math.sin(180 * (Math.PI / 180));

    } else if (x < 0 && y < 0 && angle >= 22.5 && angle < 67.5) {
        rx = r * Math.cos(225 * (Math.PI / 180));
        ry = r * Math.sin(225 * (Math.PI / 180));
    }
    else if ((y <= 0 && angle >= 67.5 && angle < 90) || (y <= 0 && angle >= -90 && angle < -67.5)) {
        rx = r * Math.cos(270 * (Math.PI / 180));
        ry = r * Math.sin(270 * (Math.PI / 180));
    }
    else if (x > 0 && y < 0 && angle >= -67.5 && angle < -22.5) {
        rx = r * Math.cos(315 * (Math.PI / 180));
        ry = r * Math.sin(315 * (Math.PI / 180));
    }
    else if ((x >= 0 && y < 0 && angle >= -22.5 && angle < 0) || (x >= 0 && y >= 0 && angle >= 0 && angle < 22.5)) {
        rx = r * Math.cos(360 * (Math.PI / 180));
        ry = r * Math.sin(360 * (Math.PI / 180));
    }
    return [rx, ry];
};

