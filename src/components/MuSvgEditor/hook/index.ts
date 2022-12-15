export function isEmptyObj(obj: {}) {
    try {
        return JSON.stringify(obj) === '{}';
    } catch (error) {
        return 0 === (Object.keys(obj) || Object.getOwnPropertyNames(obj)).length;
    }
};