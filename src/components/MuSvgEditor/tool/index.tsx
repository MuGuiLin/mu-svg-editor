import { defineComponent, ref, watch } from 'vue'
import style from './style.module.less'

export default defineComponent({
    props: {

    },
    setup(props) {
        // const activeKey = ref({ activeKey: ['1', 2, 3] });
        let activeKey = ref(['1', 2, 3]);
        const text = `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`;
        const customStyle =
            'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden';
        watch(activeKey, val => {
            console.log(val);
        });
        return {
            activeKey,
            text,
            customStyle,
        };
    },
    render() {
        const { activeKey, text, customStyle }: any = this;
        console.log(activeKey)
        return (
            <aside class={style.tool}>
                <a-collapse v-model:activeKey={activeKey} bordered={false} expandIconPosition="left">
                    <a-collapse-panel key="1" header="基本绘图">
                        <p><line-outlined /> 直线</p>
                        <p><stock-outlined /> 曲线</p>
                        <p><border-outlined /> 矩形</p>
                        <p><loading3-quarters-outlined /> 圆形</p>
                        <p><highlight-outlined /> 路径</p>
                        <p><font-size-outlined /> 文本</p>
                        <p><bg-colors-outlined /> 填充</p>
                    </a-collapse-panel>
                    <a-collapse-panel key={2} header="内置控件">
                        <p>Internet</p>
                        <p>路由器</p>
                        <p>交换机</p>
                        <p>防火墙</p>
                        <p>流量监控</p>
                        <p>服务器</p>
                        <p>虚拟机</p>
                        <p>负载均衡</p>
                        <p>信号链路</p>
                        <p>系统</p>
                        <p>传统设备</p>
                        <p>服务</p>
                        <p>数据库</p>
                        <p>存储</p>
                        <p>PC电脑</p>
                        <p>手机</p>
                        <p>信号流</p>
                        <p>单体</p>
                        <p>冗余组</p>
                        <p>集群</p>
                        <p>访问人</p>
                    </a-collapse-panel>
                    <a-collapse-panel key={3} header="其他控件">
                        <p>自定义1</p>
                        <p>自定义2</p>
                        <p>自定义3</p>
                    </a-collapse-panel>
                </a-collapse>
            </aside >
        );
    }
});