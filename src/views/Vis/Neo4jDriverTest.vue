<template>
  <div class="vis" id="neo4jdrivertest"></div>
</template>

<script lang="ts">
//@ts-nocheck
import { defineComponent, onMounted } from "vue";
import { Network, DataSet } from "vis";
import neo4j from "neo4j-driver";

export default defineComponent({
  name: "Neo4jDriverTest",
  setup() {
    function queryData() {
      const driver = neo4j.driver(
        "xxxxxxx", // 服务器地址
        neo4j.auth.basic("neo4j", "xxxxx") //账号 密码
      );
      const orderStr =
        "MATCH p=((n:Service)-[r:dependency]-(:Service)) return p";
      console.log("driver获取数据库数据:", driver);
      let session = driver.session();
      session
        .run(orderStr, {})
        .then((result) => {
          console.log("neo4j 查询结果", result.records);
          const data = setData(result.records);
          // 画图
          draw(data);
          session.close();
        })
        .catch(function (error) {
          console.log("Cypher 执行失败！", error);
          driver.close();
        });
    }

    function setData(records: any) {
      const nodes = new DataSet(); // 节点数组
      const nodesRelation = new DataSet(); // 节点关系数组
      // 开始处理数据
      for (let i = 0; i < records.length; i++) {
        const segments = records[i]._fields[0].segments[0];
        const startName = segments.start.properties.name;
        const endName = segments.end.properties.name;

        const nodesArray: any[] = Array.from(nodes);
        let hasStartName = false,
          hasEndName = false;
        for (const key in nodes._data) {
          if (key === startName) hasStartName = true;
          if (key === endName) hasEndName = true;
        }

        if (!hasStartName)
          nodes.add({
            label: startName,
            id: startName,
            title: segments.start.properties.describe,
          });
        if (!hasEndName)
          nodes.add({
            label: endName,
            id: endName,
            title: segments.end.properties.describe,
          });

        nodesRelation.add({
          from: startName,
          to: endName,
          label: segments.relationship.type,
          id: i,
          arrows: "to",
        });
      }
      return {
        nodes,
        edges: nodesRelation,
      };
    }

    function draw(data: any) {
      const container = document.getElementById(
        "neo4jdrivertest"
      ) as HTMLElement;
      const options: any = {
        autoResize: true,
        // / 设置节点样式
        nodes: {
          shape: "dot",
          size: 20,
          font: {
            //字体配置
            size: 20,
          },
          color: {
            // border: "#2B7CE9", //节点边框颜色
            background: "#97C2FC", //节点背景颜色
            highlight: {
              //节点选中时状态颜色
              border: "#000",
              background: "#3FA8FF",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#000",
              background: "#3FA8FF",
            },
          },
          borderWidth: 0, //节点边框宽度，单位为px
          borderWidthSelected: 3, //节点被选中时边框的宽度，单位为px
        },
        // 边线配置
        edges: {
          width: 1,
          length: 260,
          color: {
            color: "#848484",
            highlight: "#848484",
            hover: "#848484",
            inherit: "from",
            opacity: 1.0,
          },
          shadow: false,
          smooth: {
            //设置两个节点之前的连线的状态
            enabled: false, //默认是true，设置为false之后，两个节点之前的连线始终为直线，不会出现贝塞尔曲线
          },
        },
      };
      const network = new Network(container, data, options);
    }

    onMounted(() => {
      queryData();
    });
  },
});
</script>

<style scoped>
.vis {
  height: calc(100% - 100px);
}
</style>
