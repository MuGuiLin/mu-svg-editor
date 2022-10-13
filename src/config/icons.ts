import * as icons from '@ant-design/icons-vue';

export const install = (app: any) => {
    const icon: any = icons;
    Object.keys(icon).forEach((o) => {
        app.component(o, icon[o]);
    });
};

export default install;