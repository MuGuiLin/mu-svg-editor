import { defineComponent, ref } from 'vue';
import style from './style.module.less'

export default defineComponent({
    name: 'Menu',
    props: {
        menu: {}
    },
    setup(props, ctx) {
        const current = ref<string[]>(['mails']);
   
        console.log(111, props)
        return {
            current,
          };
    },
    render() {
        console.log(666, this);

        const { menu, current }: any = this;
        console.log(333, menu);

        return (
            <header class={style.menu}>
                <a-menu v-model:selectedKeys={current} mode="horizontal">
                    <a-menu-item key="file" icon={<folder-open-outlined />}>文件</a-menu-item>
                    <a-menu-item key="edit" icon={<form-outlined />}>编辑</a-menu-item>
                    <a-sub-menu key="view" icon={<folder-view-outlined /> } title="视图">
                        <a-menu-item-group title="Item 1">
                            <a-menu-item key="setting:1">
                            <label>
                                <a-switch v-model:checked={menu.isScale} checked-children="开" un-checked-children="关" /> 显示标尺
                            </label>
               
                            </a-menu-item>
                            <a-menu-item key="setting:2">
                            <label>
                                <a-switch v-model:checked={menu.isLine} checked-children="开" un-checked-children="关" /> 坐标辅助
                            </label>
                            </a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="Item 2">
                            <a-menu-item key="setting:3">Option 3</a-menu-item>
                            <a-menu-item key="setting:4">Option 4</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="about" title="关于">
                        <a-menu-item-group title="">
                            <a-menu-item key="about" icon={<github-outlined />}>
                                <a href="https://github.com/MuGuiLin" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </a-menu-item>
                            <a-menu-item key="about" icon={<logout-outlined />}>
                                <a href="https://github.com/MuGuiLin/mu-svg-editor" target="_blank" rel="noopener noreferrer">
                                    mu-svg-editor
                                </a>
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                   
                </a-menu>
               
            </header>
        );
    }
});
