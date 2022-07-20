<template>
  <!-- 动态数据 -->
  <a-row>
    <a-col :span="12">
      <a-form
        :model="nodesState"
        name="nodes"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="id" name="id">
          <a-input v-model:value="nodesState.id" />
        </a-form-item>
        <a-form-item label="label" name="label">
          <a-input v-model:value="nodesState.label" />
        </a-form-item>
      </a-form>
      <a-space>
        <a-button @click="add">新增</a-button>
        <a-button @click="upDate">更新</a-button>
        <a-button @click="remove">删除</a-button>
      </a-space>
    </a-col>
    <a-col :span="12">
      <a-form
        :model="edgesState"
        name="edges"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="id" name="id">
          <a-input v-model:value="edgesState.id" />
        </a-form-item>
        <a-form-item label="from" name="from">
          <a-input v-model:value="edgesState.from" />
        </a-form-item>
        <a-form-item label="to" name="to">
          <a-input v-model:value="edgesState.to" />
        </a-form-item>
      </a-form>
      <a-space>
        <a-button @click="addEdges">新增</a-button>
        <a-button @click="upDateEdges">更新</a-button>
        <a-button @click="removeEdges">删除</a-button>
      </a-space>
    </a-col>
  </a-row>
  <div class="vis" id="dynamicdata"></div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, onMounted, reactive } from "vue";
import { DataSet, Network } from "vis";
import { Space } from "ant-design-vue";

export default defineComponent({
  name: "DynamicData",
  components: { [Space.name]: Space },
  setup() {
    let nodes = new DataSet();
    let edges = new DataSet();
    const nodesState = reactive({
      id: "",
      label: "",
    });
    const edgesState = reactive({
      id: "",
      from: "",
      to: "",
    });

    function add() {
      nodes.add({
        id: nodesState.id,
        label: nodesState.label,
      });
    }

    function upDate() {
      nodes.update({
        id: nodesState.id,
        label: nodesState.label,
      });
    }

    function remove() {
      nodes.remove({ id: nodesState.id });
    }

    function addEdges() {
      edges.add({
        id: edgesState.id,
        from: edgesState.from,
        to: edgesState.to,
      });
    }

    function upDateEdges() {
      edges.update({
        id: edgesState.id,
        from: edgesState.from,
        to: edgesState.to,
      });
    }

    function removeEdges() {
      edges.remove({ id: edgesState.id });
    }

    function draw() {
      nodes.add([
        { id: "1", label: "Node 1" },
        { id: "2", label: "Node 2" },
        { id: "3", label: "Node 3" },
        { id: "4", label: "Node 4" },
        { id: "5", label: "Node 5" },
      ]);
      edges.add([
        { id: "1", from: "1", to: "2" },
        { id: "2", from: "1", to: "3" },
        { id: "3", from: "2", to: "4" },
        { id: "4", from: "2", to: "5" },
      ]);
      // create a network
      const container = document.getElementById("dynamicdata") as HTMLElement;
      const data = {
        nodes: nodes,
        edges: edges,
      };
      const options = {};
      const network = new Network(container, data, options);
    }

    onMounted(() => {
      draw();
    });
    return {
      nodesState,
      edgesState,
      add,
      upDate,
      remove,
      addEdges,
      upDateEdges,
      removeEdges,
    };
  },
});
</script>

<style scoped>
.vis {
  height: calc(100% - 100px);
}
.ant-row {
  max-width: 50%;
}
</style>
