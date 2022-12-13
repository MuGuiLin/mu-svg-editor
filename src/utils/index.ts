export const getLocalFile = (url: string) => new URL(`../assets/${url}`, import.meta.url).href;
