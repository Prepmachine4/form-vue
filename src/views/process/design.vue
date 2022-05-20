<template>
    <div class="toolbar app-container">
      <el-button type="primary" @click="dialogVisible = true">添加流程</el-button>
    </div>
    <el-dialog top="5vh" title="流程图" v-model="dialogVisible" fullscreen >
        <vue-bpmn  product="flowable" @processSave="processSave"></vue-bpmn>
    </el-dialog>
</template>

<script setup>
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import VueBpmn from "@/components/bpmn/VueBpmn";

import {defineComponent, ref} from "vue";
const dialogVisible=ref(false)
defineComponent([VueBpmn])


const processSave = () => {

}

</script>

<style scoped lang="scss">
.app-container{
  background-color: white;
  padding: 30px;
}
</style>