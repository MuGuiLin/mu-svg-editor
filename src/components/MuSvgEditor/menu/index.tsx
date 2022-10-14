import { defineComponent } from 'vue';
import style from './style.module.less'

export default defineComponent({
    name: 'Menu',
    props: {
        menu: {}
    },
    setup(props, ctx) {

        console.log(111, props)
        return {

        }
    },
    render() {
        console.log(666, this);

        const { menu }: any = this;
        console.log(333, menu);

        return (
            <header class={style.menu}>
                <label>
                    显示标尺：
                    <a-switch v-model:checked={menu.isScale} checked-children="开启" un-checked-children="关闭" />
                </label>，
                <label>
                    坐标辅助：
                    <a-switch v-model:checked={menu.isLine} checked-children="开启" un-checked-children="关闭" />
                </label>
            </header>
        );
    }
});
