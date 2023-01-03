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
    const href = 'data:text;charset=utf-8,' + encodeURIComponent(document.querySelector('#svg').outerHTML);
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', `${new Date().getTime()}.svg`);
    a.click();
    a.remove();
    callBack?.();
};

