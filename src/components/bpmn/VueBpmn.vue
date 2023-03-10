<template>
  <div class="container">
    <div class="bpmn-viewer">
      <vue-header class="bpmn-viewer-header" :processData="initData" :modeler="bpmnModeler" @restart="restart"
                  @handleExportSvg="handleExportSvg" @handleExportBpmn="handleExportBpmn" @processSave="processSave"></vue-header>
      <div class="bpmn-viewer-container">
        <div class="bpmn-viewer-content" ref="bpmnViewer"></div>
      </div>
    </div>
    <bpmn-panel v-if="bpmnModeler" :modeler="bpmnModeler" :process="initData"></bpmn-panel>
  </div>
</template>

<script>
  import templateXml from "./data/template";
  import BpmnModeler from 'jeeplus-bpmn/lib/Modeler'
  import customTranslate from "./data/translate/customTranslate";
  import VueHeader from "./Header";
  import BpmnPanel from "./panel/index";
  import activitiModele from './data/activiti.json'
  import flowableModdle from './data/flowable.json'
  import './assets/css/vue-bmpn.css'
  import './assets/css/font-awesome.min.css'

  export default {
    name: "VueBpmn",
    data() {
      return {
        bpmnModeler: null,
        initTemplate: "",
        initData: {}
      }
    },
    props: {
      product: String,
      xml:String
    },
    components: {
      VueHeader, BpmnPanel
    },
    mounted() {

      let processId = new Date().getTime();
      if(this.xml) {
        let xml=this.xml.replace(/{str}/g, processId.toString())
        this.initTemplate=xml
      }
      else this.initTemplate = templateXml.initTemplate(processId)
      this.initData = {key: "process" + processId, name: "流程" + processId, xml: this.initTemplate,backMethod:0}
      this.init();


    },
    methods: {
      init() {
        // 支持activiti和flowable
        // let _moddleExtensions = this.getModdleExtensions();
        // 获取画布 element
        this.canvas = this.$refs.bpmnViewer;
        // 创建Bpmn对象
        this.bpmnModeler = new BpmnModeler({
          container: this.canvas,
          additionalModules: [
            {
              translate: ['value', customTranslate]
            }
          ],
          // moddleExtensions: _moddleExtensions
        });

        // 初始化建模器内容
        this.initDiagram(this.initTemplate);


      },
      initDiagram(xml) {
        let that=this
        this.bpmnModeler.importXML(xml, err => {
          if (err) {
            // this.$Message.error("打开模型出错,请确认该模型符合Bpmn2.0规范");
          }
          let _tag = document.getElementsByTagName("svg")[0];
          if (_tag) {
            _tag.style.width = "100%";
            _tag.style.height = "700px";
          }

          //  渲染颜色
          const elementRegistry = this.bpmnModeler.get('elementRegistry');
          const userTaskList = elementRegistry.filter(
              (item) => item.type === 'bpmn:UserTask'&& item.businessObject.$attrs.status
          );
          userTaskList.forEach(ele=>{
            let colorMap={
              "success":'#59C173',
              "reject":'red'
            }
            this.bpmnModeler.get('modeling').setColor(ele,{fill:colorMap[ele.businessObject.$attrs.status]})
          })


          if(that.xml){

            that.bpmnModeler.saveSVG((err, svg) => {
              if (err) {
                console.error(err)
              }
              // console.log(svg)
              svg=svg.replace(`width="0" height="0" viewBox="0 0 0 0"`,`width="458" height="92" viewBox="136 184 458 92"`)
              that.$emit("getStatusSvg",svg)
            })
          }
        });


      },
      handleExportBpmn() {
        const _this = this;
        this.bpmnModeler.saveXML(function (err, xml) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('BPMN', xml);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename; //指定下载的文件名
            a.href = href; //  URL对象
            a.click(); // 模拟点击
            URL.revokeObjectURL(a.href); // 释放URL 对象
          }
        });
      },
      handleExportSvg() {
        const _this = this;
        this.bpmnModeler.saveSVG(function (err, svg) {
          if (err) {
            console.error(err)
          }
          let {filename, href} = _this.setEncoded('SVG', svg);
          if (href && filename) {
            let a = document.createElement('a');
            a.download = filename;
            a.href = href;
            a.click();
            URL.revokeObjectURL(a.href);
          }
        });
      },
      setEncoded(type, data) {
        const encodedData = encodeURIComponent(data);
        if (data) {
          if (type === 'XML') {
            return {
              filename: 'diagram.bpmn20.xml',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'BPMN') {
            return {
              filename: 'diagram.bpmn',
              href: "data:application/bpmn20-xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
          if (type === 'SVG') {
            this.initData.svg = data;
            return {
              filename: 'diagram.svg',
              href: "data:application/text/xml;charset=UTF-8," + encodedData,
              data: data
            }
          }
        }
      },
      processSave(data){
        let initData = this.initData;
        data.procId = initData.key;
        data.name = initData.name;
        data.backMethod=initData.backMethod;
        this.$emit("processSave",data);
      },
      restart() {
        let processId = new Date().getTime();
        this.initTemplate = templateXml.initTemplate(processId)
        this.initData = {key: "process" + processId, name: "流程" + processId, xml: this.initTemplate}
        this.initDiagram(this.initTemplate)
      },
      getModdleExtensions() {
        let moddleExtensions = {};
        if (this.product == "flowable") {
          moddleExtensions = {
            flowable: flowableModdle
          }
        }
        if (this.product == "activiti") {
          moddleExtensions = {
            activiti: activitiModele
          }
        }
        return moddleExtensions;
      }
    }
  }
</script>

<style scoped lang="scss">
.bpmn-viewer-container{

  height: 75vh;
  .bpmn-viewer-content{
    height: 60vh;
  }
}


</style>
