<template>
  <main class="d-flex flex-wrap justify-content-center m-auto mt-5 col-11">
    <div class="d-flex w-100 justify-content-between">
      <div class="frame d-flex justify-content-center align-items-center" style="width:35%">
        <Imports></Imports>
      </div>
      <div class="frame" style="width:60%">
        <Canvas :labels="labels"></Canvas>
      </div>
    </div>
    <div class="frame w-100 mt-5" style="height:220px;">
      <ChartInfo></ChartInfo>
    </div>
  </main>
</template>

<script>
import Imports from './components/Imports.vue'
import Canvas from './components/Canvas.vue'
import ChartInfo from './components/ChartInfo.vue'

export default {
  name: 'App',
  components: {
    Imports,
    Canvas,
    ChartInfo,
  },
  data() {
    return {
      labels: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000],
    }
  },
}
</script>

<style>
body {
  background-color: #ABC;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.frame {
  background-color: #DEF;
  padding: 2rem;
  border-radius: 0.5rem;
}
</style>
