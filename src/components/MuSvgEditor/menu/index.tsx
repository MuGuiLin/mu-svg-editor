import { defineComponent, ref } from 'vue';
import style from './style.module.less'

export default defineComponent({
    name: 'Menu',
    props: {
        attr: {}
    },
    setup(props, ctx) {
        let current = ref<string[]>(['file']);

        return {
            current,
        };
    },
    render() {

        const { attr, current }: any = this;

        return (
            <header class={style.menu}>
                <a-menu class={style.nav} v-model:selectedKeys={current} mode="horizontal">
                    <a-sub-menu key="file" title="文件" icon={<folder-open-outlined />}>
                        <a-menu-item-group title="打开">
                            <a-menu-item key="file:1" icon={<folder-open-outlined />}>打开SVG</a-menu-item>
                            <a-menu-item key="file:2" icon={<export-outlined />}>导入图片</a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="输出">
                            <a-menu-item key="file:3" icon={<save-outlined />}>保存SVG</a-menu-item>
                            <a-menu-item key="file:4" icon={<import-outlined />}>导出PNG</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="edit" title="编辑" icon={<form-outlined />} >
                        <a-menu-item key="edit:1" icon={<rotate-left-outlined />}>撤消</a-menu-item>
                        <a-menu-item key="edit:2" icon={<rotate-right-outlined />}>重做</a-menu-item>
                        <a-menu-item key="edit:3" icon={<scissor-outlined />}>剪切</a-menu-item>
                        <a-menu-item key="edit:4" icon={<copy-outlined />}>复制</a-menu-item>
                        <a-menu-item key="edit:5" icon={<snippets-outlined />}>粘贴</a-menu-item>
                        <a-menu-item key="edit:6" icon={<delete-outlined />}>删除</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="view" title="视图" icon={<eye-outlined />} >
                        <a-menu-item-group title="查看">
                            <a-menu-item key="view:1" icon={<folder-view-outlined />}>视图预览</a-menu-item>
                            <a-menu-item key="view:2" icon={<code-outlined />}>SVG代码</a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="辅助">
                            <a-menu-item key="view:3">
                                <label>
                                    <a-switch v-model:checked={attr.isScale} size="small" checked-children="开" un-checked-children="关" /> 显示标尺
                                </label>
                            </a-menu-item>
                            <a-menu-item key="view:4">
                                <label>
                                    <a-switch v-model:checked={attr.isLine} size="small" checked-children="开" un-checked-children="关" /> 显示坐标
                                </label>
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="sort" title="排列" icon={<pic-center-outlined />} >
                        <a-menu-item key="sort:1" icon={<insert-row-above-outlined />}>置于顶层</a-menu-item>
                        <a-menu-item key="sort:2" icon={<insert-row-below-outlined />}>置于底层</a-menu-item>
                        <a-menu-item key="sort:3" icon={<vertical-align-top-outlined />}>置上一层</a-menu-item>
                        <a-menu-item key="sort:4" icon={<vertical-align-bottom-outlined />}>置下一层</a-menu-item>
                        <a-menu-item key="sort:5" icon={<group-outlined />}>对象组合</a-menu-item>
                        <a-menu-item key="sort:6" icon={<ungroup-outlined />}>对象分解</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="about" title="关于" icon={<trademark-outlined />}>
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
                                Mu-Svg-Editor
                            </a>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </header>
        );
    }
});
