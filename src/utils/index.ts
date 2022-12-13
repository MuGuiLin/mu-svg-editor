
export function getLocalFile(url: string) {
    return new URL(`../assets/${url}`, import.meta.url).href;
};

export function getLocalFileSync(url: string) {
    return new Promise((resolve, reject) => {
        try {
            resolve(new URL(`../assets/${url}`, import.meta.url).href);
        } catch (error) {
            reject(error);
        }
    });
};
