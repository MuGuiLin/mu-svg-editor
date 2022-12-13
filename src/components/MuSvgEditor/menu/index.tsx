import { defineComponent, ref } from 'vue';
import style from './style.module.less'
import { hookSeveSvg } from '../hook/operate'

export default defineComponent({
    name: 'Menu',
    props: {
        prop: {}
    },
    setup(props, ctx) {
        let current = ref<string[]>(['file']);

        return {
            current,
        };
    },
    render() {
        const { prop: { canvas } }: any = this;
        return (
            <header class={style.menu}>
                <a-menu class={style.nav} v-model:selectedKeys={this.current} mode="horizontal">
                    <a-sub-menu key="file" title="文件（F）" icon={<folder-open-outlined />}>
                        <a-menu-item-group title="打开">
                            <a-menu-item key="file:1" icon={<folder-open-outlined />}>打开SVG  （Ctrl + O）</a-menu-item>
                            <a-menu-item key="file:2" icon={<export-outlined />}>导入图片 （Ctrl + I）</a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="输出">
                            <a-menu-item key="file:3" onClick={() => hookSeveSvg()} icon={<save-outlined />}>保存SVG （Ctrl + S）</a-menu-item>
                            <a-menu-item key="file:4" icon={<import-outlined />}>导出PNG （Ctrl + E）</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="edit" title="编辑（E）" icon={<form-outlined />} >
                        <a-menu-item key="edit:1" icon={<rotate-left-outlined />}>撤消 （Ctrl + Z）</a-menu-item>
                        <a-menu-item key="edit:2" icon={<rotate-right-outlined />}>重做 （Ctrl + Y）</a-menu-item>
                        <a-menu-item key="edit:3" icon={<scissor-outlined />}>剪切 （Ctrl + X）</a-menu-item>
                        <a-menu-item key="edit:4" icon={<copy-outlined />}>复制 （Ctrl + C）</a-menu-item>
                        <a-menu-item key="edit:5" icon={<snippets-outlined />}>粘贴 （Ctrl + V）</a-menu-item>
                        <a-menu-item key="edit:6" icon={<delete-outlined />}>删除 （DELETE）</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="view" title="视图（V）" icon={<eye-outlined />} >
                        <a-menu-item-group title="查看">
                            <a-menu-item key="view:1" icon={<folder-view-outlined />}>视图预览 （Ctrl + P）</a-menu-item>
                            <a-menu-item key="view:2" icon={<code-outlined />}>SVG代码 （Ctrl + E）</a-menu-item>
                        </a-menu-item-group>
                        <a-menu-item-group title="辅助">
                            <a-menu-item key="view:3">
                                <label>
                                    <a-switch v-model:checked={canvas.isScale} size="small" checked-children="开" un-checked-children="关" /> 显示标尺
                                </label>
                            </a-menu-item>
                            <a-menu-item key="view:4">
                                <label>
                                    <a-switch v-model:checked={canvas.isLine} size="small" checked-children="开" un-checked-children="关" /> 显示坐标
                                </label>
                            </a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="sort" title="图层（L）" icon={<pic-center-outlined />} >
                        <a-menu-item key="sort:1" icon={<insert-row-above-outlined />}>置于顶层 （Ctrl + ⇢）</a-menu-item>
                        <a-menu-item key="sort:2" icon={<insert-row-below-outlined />}>置于底层 （Ctrl + ⇠）</a-menu-item>
                        <a-menu-item key="sort:3" icon={<vertical-align-top-outlined />}>置上一层 （Ctrl + ⇡）</a-menu-item>
                        <a-menu-item key="sort:4" icon={<vertical-align-bottom-outlined />}>置下一层 （Ctrl + ⇣）</a-menu-item>
                        <a-menu-item key="sort:5" icon={<group-outlined />}>图层组合 （Ctrl + G）</a-menu-item>
                        <a-menu-item key="sort:6" icon={<ungroup-outlined />}>图层分解 （Ctrl + D）</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="page" title="页面（P）" icon={<layout-outlined />} >
                        <a-menu-item-group title="画布网格大小">
                            <a-menu-item key="file:1" icon={<fullscreen-exit-outlined />}>微小</a-menu-item>
                            <a-menu-item key="file:2" icon={<vertical-align-middle-outlined />}>正常</a-menu-item>
                            <a-menu-item key="file:3" icon={<drag-outlined />}>略大</a-menu-item>
                            <a-menu-item key="file:4" icon={<fullscreen-outlined />}>超大</a-menu-item>
                        </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="help" title="帮助（H）" icon={<question-circle-outlined />}>
                        <a-menu-item key="help:1" icon={<github-outlined />}>
                            <a href="https://github.com/MuGuiLin" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                        </a-menu-item>
                        <a-menu-item key="help:2" icon={<trademark-outlined />}>
                            <a href="http://www.muguilin.com" target="_blank" rel="noopener noreferrer">
                                About
                            </a>
                        </a-menu-item>
                        <a-menu-item key="help:3" icon={<logout-outlined />}>
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
