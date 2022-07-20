<template>
  <!-- 自定义缩放 -->
  <div class="vis" id="scalingcustom"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { DataSet, Network } from "vis";

export default defineComponent({
  name: "ScalingCustom",
  setup() {
    function draw() {
      // 创建人物  value是人物年龄
      const nodes = new DataSet([
        { id: 1, value: 2, label: "Algie" },
        { id: 2, value: 31, label: "Alston" },
        { id: 3, value: 12, label: "Barney" },
        { id: 4, value: 16, label: "Coley" },
        { id: 5, value: 17, label: "Grant" },
        { id: 6, value: 15, label: "Langdon" },
        { id: 7, value: 6, label: "Lee" },
        { id: 8, value: 5, label: "Merlin" },
        { id: 9, value: 30, label: "Mick" },
        { id: 10, value: 18, label: "Tod" },
      ]);
      // create connections between people
      // value corresponds with the amount of contact between two people
      const edges = new DataSet([
        { from: 2, to: 8, value: 3 },
        { from: 2, to: 9, value: 5 },
        { from: 2, to: 10, value: 1 },
        { from: 4, to: 6, value: 8 },
        { from: 5, to: 7, value: 2 },
        { from: 4, to: 5, value: 1 },
        { from: 9, to: 10, value: 2 },
        { from: 2, to: 3, value: 6 },
        { from: 3, to: 9, value: 4 },
        { from: 5, to: 3, value: 1 },
        { from: 2, to: 7, value: 4 },
      ]);
      // create a network
      const container = document.getElementById("scalingcustom") as HTMLElement;
      const data = {
        nodes: nodes,
        edges: edges,
      };
      const options = {
        nodes: {
          shape: "dot",
          scaling: {
            customScalingFunction: function (
              _min: any,
              _max: any,
              total: number,
              value: number
            ) {
              return value / total;
            },
            min: 5,
            max: 150,
          },
        },
      };
      const network = new Network(container, data, options);
    }

    onMounted(() => {
      draw();
    });
  },
});
</script>

<style scoped>
.vis {
  height: calc(100% - 100px);
}
</style>
