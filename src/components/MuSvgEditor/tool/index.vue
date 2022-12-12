<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { message } from 'ant-design-vue';

const { attr }: any = defineProps({
    attr: Object
});
const state = reactive({
    fill: '#2F2F2C', // 
    activeKey: ['0', '1']
});


watch(() => state.activeKey, val => {
    console.log(val);
});

const dragsvg = (e: DragEvent, o: any) => {
    state.fill = '#0092FF'
};

const dragstart = (e: DragEvent, o: any) => {
    console.log(333, o);
    attr.dragstart = true;
    attr.nowTool = o;
};

const dragend = (e: DragEvent, o: any) => {
    //拖动时记录拖动的svg信息
    if (e.dataTransfer?.dropEffect !== 'copy') {
        message.warning('请将组件拖到画布中！');
        attr.dragstart = false;
        //清空已选择的信息
        return;
    }
};

</script>

<template>
    <aside class="tool">
        <a-collapse v-model:activeKey="state.activeKey">
            <a-collapse-panel v-for="(t, i) in attr.tool" :key="i" :header="t.title">
                <div class="drag" v-for="(m, j) in t.child" :key="j">
                    <template v-if="1 === m.event">
                        <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <path :fill="state.fill" :d="m.path"></path>
                        </svg>
                        <b>{{ m.name }}</b>
                    </template>
                    <template v-else>
                        <i :class="m.type" :draggable="true" @dragstart="dragstart($event, m)"
                            @dragend="dragend($event, m)"></i>
                        <b>{{ m.name }}</b>
                    </template>

                </div>
            </a-collapse-panel>
        </a-collapse>
    </aside>
</template>

<style scoped lang="less">
.tool {
    box-sizing: border-box;
    grid-area: tool;
    padding: 0px;
    background-color: rgb(45, 45, 45);
    border-right: 1px solid rgb(100, 100, 100);
    overflow-y: auto;
    text-align: center;
    user-select: none;

    .drag {
        display: inline-block;
        margin: 10px 5px;
        width: 50px;
        height: 60px;

        svg {

            display: inline-block;
            width: 50px;
            height: 50px;
            border: 1px solid gray;
            background-color: #0092ff;
            background-color: #fff;

            g {
                width: 30px;
                height: 30px;
            }
        }

        i {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 1px solid gray;
            overflow: hidden;
            cursor: pointer;

            &.monomer {
                background: url(@/assets/icon/tool/monomer.webp) no-repeat center center;
                background-size: contain;
            }

            &.redundancy-group {
                background: url(@/assets/icon/tool/redundancy-group.webp) no-repeat center center;
                background-size: contain;
            }

            &.internet {
                background: url(@/assets/icon/tool/internet.webp) no-repeat center center;
                background-size: contain;
            }

            &.computer {
                background: url(@/assets/icon/tool/computer.webp) no-repeat center center;
                background-size: contain;
            }

            &.phone {
                background: url(@/assets/icon/tool/phone.webp) no-repeat center center;
                background-size: contain;
            }

            &.visitor {
                background: url(@/assets/icon/tool/visitor.webp) no-repeat center center;
                background-size: contain;
            }

            &.switch {
                background: url(@/assets/icon/tool/switch.webp) no-repeat center center;
                background-size: contain;
            }

            &.core-switch {
                background: url(@/assets/icon/tool/core-switch.webp) no-repeat center center;
                background-size: contain;
            }

            &.firewall {
                background: url(@/assets/icon/tool/firewall.webp) no-repeat center center;
                background-size: contain;
            }

            &.flow-monitor {
                background: url(@/assets/icon/tool/flow-monitor.webp) no-repeat center center;
                background-size: contain;
            }

            &.server {
                background: url(@/assets/icon/tool/server.webp) no-repeat center center;
                background-size: contain;
            }

            &.virtual-machine {
                background: url(@/assets/icon/tool/virtual-machine.webp) no-repeat center center;
                background-size: contain;
            }

            &.load-balancing {
                background: url(@/assets/icon/tool/load-balancing.webp) no-repeat center center;
                background-size: contain;
            }

            &.signal-link {
                background: url(@/assets/icon/tool/signal-link.webp) no-repeat center center;
                background-size: contain;
            }

            &.system {
                background: url(@/assets/icon/tool/system.webp) no-repeat center center;
                background-size: contain;
            }

            &.tradition-device {
                background: url(@/assets/icon/tool/tradition-device.webp) no-repeat center center;
                background-size: contain;
            }

            &.serve {
                background: url(@/assets/icon/tool/serve.webp) no-repeat center center;
                background-size: contain;
            }

            &.data-base {
                background: url(@/assets/icon/tool/data-base.webp) no-repeat center center;
                background-size: contain;
            }

            &.redis {
                background: url(@/assets/icon/tool/redis.webp) no-repeat center center;
                background-size: contain;
            }

            &.storage {
                background: url(@/assets/icon/tool/storage.webp) no-repeat center center;
                background-size: contain;
            }

            &.signal-flow {
                background: url(@/assets/icon/tool/signal-flow.webp) no-repeat center center;
                background-size: contain;
            }

            &.colony {
                background: url(@/assets/icon/tool/colony.webp) no-repeat center center;
                background-size: contain;
            }
        }

        b {
            display: block;
            color: white;
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
}
</style>