// 直接加载本文件
export function getLocalFile(url: string) {
    return new URL(`../assets/${url}`, import.meta.url).href;
};

// 异步加载本文件
export function getLocalFileSync(url: string) {
    return new Promise((resolve, reject) => {
        try {
            resolve(new URL(`../assets/${url}`, import.meta.url).href);
        } catch (error) {
            reject(error);
        }
    });
};
