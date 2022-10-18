import { defineComponent, ref } from 'vue';
import style from './style.module.less'

export default defineComponent({
    name: 'Menu',
    props: {
        menu: {}
    },
    setup(props, ctx) {
        const current = ref<string[]>(['files']);
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
                    <a-sub-menu key="view" title="视图" icon={<pic-right-outlined />} >
                        <a-menu-item-group title="辅助">
                            <a-menu-item key="view:1">
                            <label>
                                <a-switch v-model:checked={menu.isScale} size="small" checked-children="开" un-checked-children="关" /> 显示标尺
                            </label>
               
                            </a-menu-item>
                            <a-menu-item key="view:2">
                            <label>
                                <a-switch v-model:checked={menu.isLine} size="small" checked-children="开" un-checked-children="关" /> 显示坐标
                            </label>
                            </a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="SVG">
                            <a-menu-item key="view:3">源代码</a-menu-item>
                            <a-menu-item key="view:4">视图预览</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="about" title="关于" icon={<trademark-outlined />}>
                        <a-menu-item-group title="">
                            <a-menu-item key="about:1" icon={<github-outlined />}>
                                <a href="https://github.com/MuGuiLin" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </a-menu-item>
                            <a-menu-item key="about:2" icon={<ie-outlined />}>
                                <a href="http://www.muguilin.com" target="_blank" rel="noopener noreferrer">
                                    About
                                </a>
                            </a-menu-item>
                            <a-menu-item key="about:3" icon={<logout-outlined />}>
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
