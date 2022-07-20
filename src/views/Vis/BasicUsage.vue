<template>
  <div class="vis" id="mynetwork"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { DataSet, Network } from "vis";

export default defineComponent({
  name: "UseVis",
  setup() {
    const nodes = new DataSet([
      { id: 1, label: "Node 1", title: "Node 1" },
      { id: 2, label: "Node 2", title: "Node 2" },
      { id: 3, label: "Node 3", title: "Node 3" },
      { id: 4, label: "Node 4", title: "Node 4" },
      { id: 5, label: "Node 5", title: "Node 5" },
    ]);
    const edges = new DataSet([
      { from: 1, to: 3, arrows: "to", dashes: true },
      { from: 1, to: 2, arrows: "to, from" },
      { from: 2, to: 4, arrows: "to, middle" },
      { from: 2, to: 5, arrows: "to, middle, from" },
      { from: 3, to: 3, arrows: { to: { scaleFactor: 2 } } },
    ]);

    function initData() {
      // create a network
      const container = document.getElementById("mynetwork") as HTMLElement;
      const data = {
        nodes: nodes,
        edges: edges,
      };
      const options = {};
      const network = new Network(container, data, options);
    }

    onMounted(() => {
      initData();
    });
  },
});
</script>

<style scoped>
.vis {
  height: calc(100% - 100px);
}
</style>
