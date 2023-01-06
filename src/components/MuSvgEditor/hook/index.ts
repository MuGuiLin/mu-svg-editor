export function isEmptyObj(obj: {}) {
    try {
        return JSON.stringify(obj) === '{}';
    } catch (error) {
        return 0 === (Object.keys(obj) || Object.getOwnPropertyNames(obj)).length;
    }
};

export function getMousePos(target: Element, event: MouseEvent) {
    // 获取鼠标位置
    const { clientX, clientY } = event;

    // 获取DOM元素的边界 // 核心方法：getBoundingClientRect()  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const { left, top } = target.getBoundingClientRect();

    //计算鼠标在DOM中的位置
    return [
        clientX - left,
        clientY - top
    ];
};