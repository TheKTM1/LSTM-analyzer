<!-- <template>
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
</template> -->

<template>
  <main class="d-flex flex-column align-items-center">

    <div v-if="!imported" class="d-flex align-items-center" style="height:100vh;">
      <div class="frame">
        <h3>Zaimportuj dane</h3>

        <!-- <div v-if="!imported"> -->
        <div id="searchDataWindow">
          <p class="mt-3">
            Nie zaimportowano jeszcze żadnych danych.
          </p>
          <button @click="displayImport">Szukaj plików</button>
        </div>

        <!-- <div v-else> -->
        <div id="importDataWindow" style="display: none;">
          <p class="mt-3">
            Znalezione pliki:
          </p>
          <div v-for="(fileName, key) in fileNames" :key="key" class="py-2">
            <label class="d-flex justify-content-around">
              {{ fileName }}
              <input class="checkbox-input" type="checkbox" v-model="selectedFiles" :value="key">
              <span class="checkbox-tick">
                <b>✓</b>
              </span>
            </label>
          </div>
          <p class="mt-3">
            Zaznacz te, które mają zostać pobrane.
          </p>
          <button @click="startImport">Rozpocznij</button>
        </div>

      </div>
    </div>

    <div v-else class="d-flex w-100">
      <div class="frame">
        a
      </div>
      <div class="frame w-75">
        <LineDiagram :rawChartData="rawChartData.chart1"></LineDiagram>
      </div>
    </div>

  </main>
</template>

<script>
import axios from 'axios';
import LineDiagram from './components/LineDiagram.vue'
// import Imports from './components/Imports.vue'
// import Canvas from './components/Canvas.vue'
// import ChartInfo from './components/ChartInfo.vue'

export default {
  name: 'App',
  components: {
    LineDiagram,
    // Imports,
    // Canvas,
    // ChartInfo,
  },
  data() {
    return {
      //labels: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000],
      imported: false,
      fileNames: {},
      selectedFiles: [],
      rawChartData: {
        chart1: {},
      },
    }
  },
  methods: {
    async displayImport() {
      const response = await axios({
          method: 'GET',
          url: "http://localhost:6790/api/get-files",
          timeout: 3000,
      })
      .then(response => {
          for(let i = 0; i < response.data.length; i++){
              this.fileNames[i] = response.data[i];
          }

          document.getElementById("searchDataWindow").style.display = "none";
          document.getElementById("importDataWindow").style.display = "block";
      })
      .catch(error => console.error(`Błąd: ${error}.`));
    },

    async startImport() {

      let collectFiles = {};

      for(let i = 0; i < this.selectedFiles.length; i++){

        const response = await axios({
          method: 'POST',
          url: "http://localhost:6790/api/send-file",
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            name: this.fileNames[this.selectedFiles[i]]
          },
          timeout: 3000,
        })
        .then(response => {
          
          if(!collectFiles.hasOwnProperty('entries')){
            collectFiles.entries = [];
          }

          collectFiles.entries.push(response.data);
        })
        .catch(error => console.error(`Błąd: ${error}.`));
      }

      this.rawChartData.chart1 = collectFiles;
      this.imported = true;

    },
  },
}
</script>

<style>
body {
  background-color: #ABC;
}

#app {
  font-family: Verdana, sans-serif;
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

.checkbox-input {
  opacity: 0.0;
}

.checkbox-tick {
  opacity: 0.0;
}

.checkbox-input:checked + .checkbox-tick {
  opacity: 1.0;
}
</style>
