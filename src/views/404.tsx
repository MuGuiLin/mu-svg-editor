import { defineComponent, ref, reactive } from 'vue'

import NotFound from '@/assets/img/404.png';
import './404.less';

export default defineComponent({
    name: '404',
    props: {
    },
    setup(props) {
        const msg = ref('Hello .Tsx！');
        const state = reactive({
            count: 404
        });

        const $getDom = (el: HTMLElement, doc = document) => {
            return doc.querySelector(el);
        }

        function ondragstart(event) {
            event.dataTransfer.setData("Text", event.target.id);
        };

        function ondragenter(event) {
            $getDom("#tips").innerHTML = "进入放置区域！";

            if (event.target.className == "drop") {
                event.target.style.border = "5px dotted red";
            }
        };

        function ondragleave(event) {
            $getDom("#tips").innerHTML = "离开放置区域！";

            if (event.target.className == "drop") {
                event.target.style.border = "";
            }
        };

        function ondragover(event) {
            // event.preventDefault();
            return false; // return false; 等于  event.preventDefault(); 加 e.stopPropagation();
        };

        function ondrop(event) {
            // event.preventDefault();
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
            return false;
        };

        // return () => {
        //     console.log(666);
        //     return <h1 style={{ textAlign: 'center', lineHeight: '100vh', background: `url(${NotFound}) no-repeat center ` }} onClick={($event: any) => { state.count++ }}>
        //         {msg.value} <b>{state.count}</b>
        //     </h1>
        // };
        return {
            msg,
            state,
            ondragstart,
            ondragenter,
            ondragleave,
            ondragover,
            ondrop
        };
    },
    render() {
        console.log('render', this);
        const { msg, state,
            ondragstart,
            ondragenter,
            ondragleave,
            ondragover,
            ondrop,
        } = this;

        const is = {
            template: `<text x="100" y="100" fill="red">6666666666666</text>`
        };

        return <>
            <h1 style={{ textAlign: 'center', lineHeight: '100vh', background: `url(${NotFound}) no-repeat center ` }} onClick={($event: any) => (state.count++)}>
                {msg}<b>{state.count}</b>
            </h1>

            <svg xmlns="http://www.w3.org/2000/svg" width={1008} height={567}>
                <component is={is}></component>
                <text x="100" y="100" fill="red">6666666666666</text>
            </svg>
        </>;

        return <section class="box">
            <h2>在两个矩形框中来回拖动 DOM元素:</h2>
            <hr />

            <div class="drag" id="drag" draggable={true} ondragstart={(e: Event) => ondragstart(e)} >DOM拖动我试试！</div>
            <div class="drop" ondrop={(e: Event) => ondrop(e)} ondragenter={(e: Event) => ondragenter(e)} ondragleave={(e: Event) => ondragleave(e)} ondragover={(e: Event) => ondragover(e)}></div>
            <div class="drop" ondrop={(e: Event) => ondrop(e)} ondragenter={(e: Event) => ondragenter(e)} ondragleave={(e: Event) => ondragleave(e)} ondragover={(e: Event) => ondragover(e)}></div>

            <h1 class="tips" id="tips"></h1>

            <pre class="pre">
                <code>
                    <br />注意：ondrag 事件在元素或者选取的文本被拖动时触发。拖放是 HTML5 中非常常见的功能。
                    <br />所以：为了让元素可拖动，需要使用 HTML5 draggable 属性，而链接 和 图片默认是可拖动的，不需要 draggable 属性。
                    <br />
                    <br />在拖放的过程中会触发以下事件：
                    <br />
                    <br />在拖动目标上触发事件 (源元素):
                    <br />    ondragstart - 用户开始拖动元素时触发
                    <br />    ondrag - 元素正在拖动时触发   (注意： 在拖动元素时，每隔 350 毫秒会触发 ondrag 事件)
                    <br />    ondragend - 用户完成元素拖动后触发
                    <br />
                    <br />释放目标时触发的事件:
                    <br />    ondragenter - 当被鼠标拖动的对象进入其容器范围内时触发此事件
                    <br />    ondragover - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件 (默认：无法将dom元素放置到目标或其他元素中，要实现允许放置，只须阻止对元素的默认处理方式即可。在 ondragover(event) 事件中调用 event.preventDefault()方法)
                    <br />    ondragleave - 当被鼠标拖动的对象离开其容器范围内时触发此事件
                    <br />    ondrop - 在一个拖动过程中，释放鼠标键时触发此事件
                </code>
            </pre>
        </section>
    }
});