/**
 * 删除组件（图层）
 * @param arr 
 * @param index 
 */
export function hookDelete(arr: Array<any>, index: number) {
    arr.splice(index, 1);
};


export function hookOpenSvg() {
    alert('打开SVG文件！');
};

export function hookSeveSvg() {
    const href = 'data:text;charset=utf-8,' + encodeURIComponent(document.querySelector('#svg').outerHTML);
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', `${new Date().getTime()}.svg`);
    a.click();
    a.remove();
};