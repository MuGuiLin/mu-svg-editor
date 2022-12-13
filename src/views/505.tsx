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

        function ondragstart(event) {
            console.log('开始')
            event.dataTransfer.setData("Text", event.target.id);
        };

        function ondragenter(event) {
            document.getElementById("demo").innerHTML = "进入放置区域";
            
            if (event.target.className == "droptarget") {
                event.target.style.border = "3px dotted red";
            }
        };

        function ondragleave(event) {
            document.getElementById("demo").innerHTML = "离开放置区域";
            if (event.target.className == "droptarget") {
                event.target.style.border = "";
            }
        };

        function ondragover(event) {
            event.preventDefault();
        };

        function ondrop(event) {
            console.log('drop')

            event.preventDefault();
            var data = event.dataTransfer.getData("Text");
            event.target.appendChild(document.getElementById(data));
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
        console.log(this);
        const { msg, state, ondragstart,
            ondragenter,
            ondragleave,
            ondragover,
            ondrop,
        } = this;
        // return <h1 style={{ textAlign: 'center', lineHeight: '100vh', background: `url(${NotFound}) no-repeat center ` }} onClick={($event: any) => (state.count++)}>
        //     {msg}<b>{state.count}</b>
        // </h1>

        return <div>
            <br />
            <br />
            <h2>505在两个矩形框中来回拖动 p 元素:</h2>
            
            <p id="dragtarget" ondragstart={(e: Event) => ondragstart(e)} draggable={true} >拖动我505!</p>

            <div class="droptarget" ondrop={(e: Event) => ondrop(e)} ondragenter={(e: Event) => ondragenter(e)} ondragleave={(e: Event) => ondragleave(e)} ondragover={(e: Event) => ondragover(e)}></div>
            <div class="droptarget" ondrop={(e: Event) => ondrop(e)} ondragenter={(e: Event) => ondragenter(e)} ondragleave={(e: Event) => ondragleave(e)} ondragover={(e: Event) => ondragover(e)}></div>

            <h1 id="demo"></h1>
        </div>
    }
});