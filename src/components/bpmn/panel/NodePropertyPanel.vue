<template>
  <div>
    <el-form :inline="false"
             label-width="100px"
             size="small"
             label-position="right">
      <el-form-item label="节点类型">
        <el-input v-model="localFormData.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点ID">
        <el-input v-model="localFormData.id" @change="updateId"></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="localFormData.name" @change="updateName"></el-input>
      </el-form-item>

      <!--usertask-->
      <el-form-item v-if="localFormData.type=='bpmn:UserTask'" label="节点人员">
        <el-select v-model="localFormData.userType" placeholder="请选择" @change="changeUserType">
          <el-option value="assignee" label="指定人员"></el-option>
          <el-option value="candidateGroups" label="岗位"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="指定人员id" v-if="localFormData.type=='bpmn:UserTask' && localFormData.userType === 'assignee'">
        <el-select
            v-model="localFormData.assignee"
            placeholder="请选择"
            key="1"
            @change="(value) => addUser({assignee: value})"
        >
          <el-option
              v-for="item in bpmnData.assignees"
              :key="item.value"
              :label="item.label"
              :value="`${item.label},${item.value}`"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位id"
                    v-else-if="localFormData.type=='bpmn:UserTask' && localFormData.userType === 'candidateGroups'">
        <el-select
            v-model="localFormData.candidateGroups"
            placeholder="请选择"
            @change="(value) => addUser({candidateGroups: value})"
        >
          <el-option
              v-for="item in bpmnData.candidateGroups"
              :key="item.value"
              :label="item.label"
              :value="`${item.label},${item.value}`"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--sequenceFlow-->
      <el-form-item v-if="localFormData.type=='bpmn:SequenceFlow'" label="分支条件">
        <el-input v-model="localFormData.sequenceFlow" @input="updateSequenceFlow"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {toRaw} from "vue";
import {listUser} from "@/api/system/user";
import {listDept} from "@/api/system/dept";
import {listPost} from "@/api/system/post";

export default {
  name: "NodePropertyPanel",
  mounted() {
    this.getUserAndDept()
  },
  data() {
    return {
      bpmnData: {
        assignees: [],
        candidateGroups: []
      }
    }
  },
  props: {
    modeler: {
      type: Object,
      required: true
    },
    nodeElement: {
      type: Object,
      required: true
    },
    formData: {
      type: Object,
      required: true
    }
  },
  computed: {
    localFormData: {
      get() {
        return this.formData
      }
    }
  },
  watch: {
    nodeElement: {
      handler() {
        if (this.nodeElement.type == "bpmn:StartEvent") {
          this.updateName("开始");
        }
        if (this.nodeElement.type == "bpmn:EndEvent") {
          this.updateName("结束");
        }
      }
    }
  },
  methods: {
    getUserAndDept(){
      listUser().then(res=>{
        let assignees=[]
        res.data.forEach(item=>{
          assignees.push({
            label:item.name,
            value:item._id
          })
        })
        this.bpmnData.assignees=assignees
      })
      listPost().then(res=>{
        let candidateGroups=[]
        res.data.forEach(item=>{
          candidateGroups.push({
            label:item.postName,
            value:item._id
          })
        })
        this.bpmnData.candidateGroups=candidateGroups
      })
    },
    updateProperties(properties) {

      this.modeler.get("modeling").updateProperties(toRaw(this.nodeElement), properties);
    },
    updateId(name) {
      this.updateProperties({id: name});
    },
    updateName(name) {
      this.updateProperties({name: name});
    },
    changeUserType() {
    },
    updateSequenceFlow(val) {
      let newCondition = this.modeler.get("moddle").create('bpmn:FormalExpression', {
        body: val
      });
      this.updateProperties({conditionExpression: newCondition});
    },
    addUser(properties) {

      let [label,value]=Object.values(properties)[0].split(',')
      properties[Object.keys(properties)[0]]=value
      if(Object.keys(properties)[0]==='assignee'){
        this.updateProperties({assignee:value});

      }
      else if(Object.keys(properties)[0]==='candidateGroups'){
        this.updateProperties({candidateGroups:value});
      }
      this.updateProperties({userType:Object.keys(properties)[0]});
      this.updateName(label)
      Object.assign(properties, {
        userType: Object.keys(properties)[0]
      });
      this.$emit('modifyFormData', properties);
    }
  }
}

</script>

<style scoped>

</style>
