<template>
  <div class="vis" id="neo4jdriver"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Network } from "vis";
import neo4j from "neo4j-driver";

export default defineComponent({
  name: "Neo4jDriver",
  setup() {
    function queryData() {
      const driver = neo4j.driver(
        "bolt://localhost:7687", // 服务器地址
        neo4j.auth.basic("neo4j", "123456") // 账号 密码
      ); // MATCH p = (:Character)-[:INTERACTS]->(:Character) RETURN p
      const query =
        "MATCH p = (:Character)-[:INTERACTS]->(:Character) RETURN p";
      console.log("driver获取数据库数据:", driver);
      let session = driver.session();
      session
        .run(query, {})
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
      const nodesArray: any[] = []; // 节点数组
      const nodesRelation: any[] = []; // 节点关系数组
      // 开始处理数据
      let nodes = new Set();
      for (let i = 0; i < records.length; i++) {
        nodes.add(records[i]._fields[0].segments[0].start.properties.name);
        nodes.add(records[i]._fields[0].segments[0].end.properties.name);
        nodesRelation.push({
          from: records[i]._fields[0].segments[0].start.properties.name,
          to: records[i]._fields[0].segments[0].end.properties.name,
          label: records[i]._fields[0].segments[0].relationship.type,
          id: i,
        });
      }

      nodes.forEach((e) => {
        nodesArray.push({
          label: e,
          id: e,
        });
      });
      return {
        nodes: nodesArray,
        edges: nodesRelation,
      };
    }

    function draw(data: any) {
      const container = document.getElementById("neo4jdriver") as HTMLElement;
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
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
            hover: {
              //节点鼠标滑过时状态颜色
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
          },
          borderWidth: 0, //节点边框宽度，单位为px
          borderWidthSelected: 2, //节点被选中时边框的宽度，单位为px
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
          arrows: { to: true }, //箭头指向to
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
