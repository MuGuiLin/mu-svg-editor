import { defineComponent, ref, reactive } from 'vue'

import NotFound from '@/assets/img/404.png'

export default defineComponent({
    name: '404',
    props: {
    },
    setup(props) {
        const msg = ref('Hello .Tsx！');
        const state = reactive({
            count: 404
        });

        // return () => {
        //     console.log(666);
        //     return <h1 style={{ textAlign: 'center', lineHeight: '100vh', background: `url(${NotFound}) no-repeat center ` }} onClick={($event: any) => { state.count++ }}>
        //         {msg.value} <b>{state.count}</b>
        //     </h1>
        // };
        return {
            msg,
            state
        };
    },
    render() {
        console.log(this);
        const { msg, state } = this;
        return <h1 style={{ textAlign: 'center', lineHeight: '100vh', background: `url(${NotFound}) no-repeat center ` }} onClick={($event: any) => (state.count++)}>
            {msg}<b>{state.count}</b>
        </h1>
    }
});