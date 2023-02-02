import { getImageBase64 } from '.';
import { useFileDialog, useFileSystemAccess, useEyeDropper } from '@vueuse/core';

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
 */
export async function hookOpenSvg(callBack?: Function): Promise<any> {
    // const { files, open, reset } = useFileDialog();
    // await open({ accept: 'image/svg+xml' });
    // console.info(files);
    // callBack?.(files);

    const { isSupported, data, file, fileName, fileMIME, fileSize, fileLastModified, create, open, save, saveAs, updateData } = useFileSystemAccess({
        // const res = useFileSystemAccess({
        dataType: 'Text',
        types: [{
            description: 'svg',
            accept: {
                'image/svg+xml': ['.svg', '.svgz'],
            },
        }],
        excludeAcceptAllOption: true,
        // multiple: false,
    });
    return new Promise((resolve, reject) => {
        open().then(() => {
            resolve({ isSupported, data, file, fileName, fileMIME, fileSize, fileLastModified });
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * 打开图像文件
 */
export async function hookImportImage(dataType: string | any = 'Text', isBase64: boolean = false): Promise<any> {
    const { isSupported, data, file, fileName, fileMIME, fileSize, fileLastModified, create, open, save, saveAs, updateData }: any = useFileSystemAccess({
        // multiple: true,
        dataType, // Text | ArrayBuffer | Blob
        types: [{
            description: 'image',
            accept: {
                'image/img': ['.jpeg', '.jpg', '.png', '.tif', '.tiff', '.webp'],
            },
        }],
        excludeAcceptAllOption: true,
    });
    return new Promise((resolve, reject) => {
        open().then(() => {
            if (isBase64) {
                getImageBase64(file?.value, (base64) => {
                    const image = new Image();
                    image.src = base64;
                    image.onload = () => {
                        resolve({ isSupported, data, file, base64, fileName, width: image.width || image.naturalWidth, height: image.height || image.naturalHeight, fileMIME, fileSize, fileLastModified });
                    };
                });
            } else {
                resolve({ isSupported, data, file, fileName, fileMIME, fileSize, fileLastModified });
            }
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * 保存SVG文件
 * @param callBack 回调方法
 */
export function hookSeveSvg(callBack?: Function): void {
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
export function hookExportImage(callBack?: Function): void {
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

/**
 * 颜色拾取器
 */
export async function hookEyeDropper(): Promise<any> {
    const { open, sRGBHex } = useEyeDropper();
    return new Promise((resolve, reject) => {
        open().then(() => {
            resolve(sRGBHex)
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

export default {
    hookDelete,
    hookOpenSvg,
    hookImportImage,
    hookSeveSvg,
    hookExportImage,
    hookEyeDropper
};