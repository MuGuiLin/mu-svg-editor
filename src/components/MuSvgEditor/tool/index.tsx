import { defineComponent } from 'vue'
import style from './style.module.less'

export default defineComponent({
    props:{

    },
    setup(props) {

    },
    render() {
        return (
            <aside class={style.tool}>
                <h3>绘图</h3>
				<p>直线</p>
				<p>曲线</p>
				<p>矩形</p>
				<p>圆形</p>
                <h3>控件</h3>
				<p>单体</p>
				<p>冗余组</p>
            </aside>
        );
    }
});