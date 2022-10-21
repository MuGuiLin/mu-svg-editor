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
                <h3>控件</h3>
            </aside>
        );
    }
});