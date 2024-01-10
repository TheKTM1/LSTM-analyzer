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
          <div class="p-1" style="max-height: 300px; overflow-y: scroll; background-color: #789;">
            <div v-for="(fileName, key) in fileNames" :key="key" class="py-2 m-2" style="background-color: #EEF; box-shadow: 2px 2px 2px black;">
              <label class="d-flex justify-content-around">
                {{ fileName }}
                <input class="checkbox-input" type="checkbox" v-model="selectedFiles" :value="key">
                <span class="checkbox-tick">
                  <b>✓</b>
                </span>
              </label>
            </div>
          </div>
          <p class="mt-3">
            Zaznacz te, które mają zostać pobrane.
          </p>
          <button @click="startImport">Rozpocznij</button>
        </div>

      </div>
    </div>

    <div v-else class="d-flex flex-column justify-content-center w-100">

      <div class="spacing d-flex justify-content-evenly w-100">
        <div class="frame w-25">
          <div class="d-flex flex-row justify-content-around" style="height: 90%">
            <div class="d-flex flex-column w-25">
              Dane
              <div class="d-flex flex-column justify-content-evenly" style="height: 100%">
                <button class="my-2">INP1</button>
                <button class="my-2">INP2</button>
                <button class="my-2" disabled>INP3</button>
                <button class="my-2">INP4</button>
                <button class="my-2">INP5</button>
              </div>
            </div>
            <div class="w-75">
              Ustawienia wykresu
              <div class="d-flex flex-column justify-content-evenly" style="height: 90%">

                <table style="height: 100%;">
                  <tr>
                    <td>
                      <label style="text-align: left;">Tryb:</label>
                    </td>
                    <td>
                      <select>
                        <option>Strata</option>
                        <option>H_size vs czas</option>
                        <option>T_steps vs czas</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Zakres osi X:</label>
                    </td>
                    <td>
                      <input type="text" size="4"> - <input type="text" size="4">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Zakres osi Y:</label>
                    </td>
                    <td>
                      <input type="text" size="4"> - <input type="text" size="4">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Interwał osi X:</label>
                    </td>
                    <td>
                      <input type="text" size="4">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Interwał osi Y:</label>
                    </td>
                    <td>
                      <input type="text" size="4">
                    </td>
                  </tr>
                </table>

              </div>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-around w-100" style="height: 10%;">
            <button>Poszerz</button>
            <button>Przeładuj</button>
          </div>
          <!-- Tryb:
          Zakres osi X:
          Zakres osi Y:
          Interwał osi X:
          Interwał osi Y:
          <button>INP1</button>
          <button disabled>INP2</button>
          <button>Poszerz</button>
          <button>Przeładuj</button> -->
        </div>
        <div class="frame w-100">
          <LossDiagram :rawChartData="rawChartData.chart1"></LossDiagram>
        </div>
      </div>

      <div class="spacing d-flex justify-content-evenly w-100">
        <div class="frame w-25">
          b
        </div>
        <div class="frame w-100">
          <HSizeDiagram :rawChartData="rawChartData.chart1"></HSizeDiagram>
        </div>
      </div>

      <div class="spacing d-flex justify-content-evenly w-100">
        <div class="frame w-25">
          c
        </div>
        <div class="frame w-100">
          <TStepsDiagram :rawChartData="rawChartData.chart1"></TStepsDiagram>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import axios from 'axios';
import LossDiagram from './components/LossDiagram.vue'
import HSizeDiagram from './components/HSizeDiagram.vue'
import TStepsDiagram from './components/TStepsDiagram.vue'
// import Imports from './components/Imports.vue'
// import Canvas from './components/Canvas.vue'
// import ChartInfo from './components/ChartInfo.vue'

export default {
  name: 'App',
  components: {
    LossDiagram,
    HSizeDiagram,
    TStepsDiagram,
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

.spacing {
  margin-top: 4rem;
  margin-bottom: 4rem;
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
