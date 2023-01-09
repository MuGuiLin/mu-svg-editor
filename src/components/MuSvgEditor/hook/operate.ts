import { useFileDialog } from '@vueuse/core';

/**
 * 删除组件（图层）
 * @param arr 
 * @param index 
 */
export function hookDelete(arr: Array<any>, index: number) {
    arr.splice(index, 1);
};

/**
 * 打开SVG文件
 * @param callBack 回调方法
 */
export async function hookOpenSvg(callBack?: Function) {
    const { files, open, reset } = useFileDialog();
    await open({ accept: 'image/svg+xml' });
    console.info(files);
    callBack?.(files);
};

/**
 * 打开图片文件
 * @param callBack 回调方法
 */
export async function hookImportImage(callBack?: Function) {
    const { files, open, reset } = useFileDialog({ accept: 'image/*' });
    await open();
    setTimeout(() => {
        console.info(files);
        callBack?.(files);
    }, 3000);
};

/**
 * 保存SVG文件
 * @param callBack 回调方法
 */
export function hookSeveSvg(callBack?: Function) {
    const svg: HTMLOrSVGElement | any = document.querySelector('#svg');
    const href = 'data:text/html;charset=utf-8,' + encodeURIComponent(svg.outerHTML);
    const a = document.createElement('a');
    a.href = href;
    a.setAttribute('download', `${new Date().getTime()}.svg`);
    a.click();
    a.remove();
    callBack?.();
};

/**
 * 保存PNG图片
 * @param callBack 回调方法
 */
export function hookExportImage(callBack?: Function) {
    const svg: HTMLOrSVGElement | any = document.querySelector('#svg');
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const a = document.createElement('a');
    const context: CanvasRenderingContext2D | any = canvas.getContext('2d');
    const image = new Image();
    image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg.outerHTML)));
    image.onload = (e: any) => {
        canvas.width = svg.clientWidth || 1008;
        canvas.height = svg.clientHeight || 567;
        console.dir(svg);
        context.drawImage(image, 0, 0);
        a.href = canvas.toDataURL('image/png');
        a.setAttribute('download', `${new Date().getTime()}.png`);
        a.click();
        a.remove();
        callBack?.();
    };
};

export default {
    hookDelete,
    hookOpenSvg,
    hookImportImage,
    hookSeveSvg,
    hookExportImage
};