<template>
  <nav>
    <router-link to="/basicUsage">基础用法</router-link> |
    <router-link to="/scalingCustom">自定义缩放</router-link> |
    <router-link to="/dynamicData">动态数据</router-link> |
    <!-- <router-link to="/neo4jDriver">数据库数据处理</router-link> | -->
    <router-link to="/neo4jDriversShow">数据库数据展示</router-link> |
  </nav>
  <router-view />
</template>

<style>
html,
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
