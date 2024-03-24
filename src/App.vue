<template>
  <main class="d-flex flex-column align-items-center">

    <div v-if="!imported" class="full-height d-flex align-items-center">
      <div class="frame">
        <h3>Zaimportuj dane</h3>

        <div id="searchDataWindow">
          <p class="mt-3">
            Nie zaimportowano jeszcze żadnych danych.
          </p>
          <button @click="displayImport">Szukaj plików</button>
        </div>

        <div id="importDataWindow" style="display: none;">
          <p class="mt-3">
            Znalezione pliki:
          </p>
          <div class="import-style p-1">
            <div v-for="(fileName, key) in fileNames" :key="key" class="file-element py-2 m-2">
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

      <div class="spacing d-flex w-100 px-3" style="gap: 1rem">
        <div class="w-25">
          <div class="d-flex w-100" style="height: 10%;">
            <div id="dataSwitch" class="toggle-data d-flex justify-content-center align-items-center w-50" @click="toggleInput">Dane</div>
            <div id="settingsSwitch" class="toggle-settings d-flex justify-content-center align-items-center w-50" @click="toggleSettings">Ustawienia wykresu</div>
          </div>
          <div class="frame" style="height: 90%; border-top-left-radius: 0; border-top-right-radius: 0;">

            <div id="dataPanel" class="panel-data p-1">
              <div v-for="(inp, key) in rawChartData.chart1.entries" :key="key" class="frame py-2 m-2">
                <div class="w-100"> {{ inp.name }} </div>
                <div class="d-flex justify-content-between">
                  <label>Nazwa:</label>
                  <input type="text" v-model="inp.name" />
                </div>
                <div class="d-flex justify-content-between">
                  <label>Rozmiar warstwy ukrytej:</label>
                  <p> {{ inp.h_size }} </p>
                </div>
                <div class="d-flex justify-content-between">
                  <label>Liczba kroków:</label>
                  <p> {{ inp.t_steps }} </p>
                </div>
                <div class="d-flex justify-content-between">
                  <label>Prędkość uczenia:</label>
                  <p> {{ inp.learning_rate }} </p>
                </div>
                <div class="d-flex justify-content-between">
                  <label>Odchylenie standardowe wag:</label>
                  <p> {{ inp.weight_sd }} </p>
                </div>
                <div class="d-flex justify-content-between">
                  <label>Liczba unikalnych znaków:</label>
                  <p> {{ inp.input_text_size }} </p>
                </div>
              </div>
            </div>

            <div id="settingsPanel" class="flex-column justify-content-evenly" style="display: none; height: 100%;">
              <div class="d-flex align-items-center">
                <label class="w-25 d-flex justify-content-base">Tytuł:</label>
                <div class="w-75 d-flex justify-content-end">
                  <textarea type="text" size="24" v-model="chartTitle"></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <label>Tryb:</label>
                <div class="w-50">
                  <select v-model="chartSelected">
                    <option value="0">Funkcja straty</option>
                    <option value="1">Zależność od czasu</option>
                    <option value="2">Zużycie RAM</option>
                  </select>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <label class="w-25 d-flex justify-content-base">Nazwa pobieranego pliku:</label>
                <div class="w-75 d-flex justify-content-end">
                  <input type="text" size="24" v-model="downloadTitle">
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <label>Tryb:</label>
                <div class="w-50">
                  <select v-model="downloadFormat">
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div v-if="chartSelected == 0" class="frame w-75">
          <LossDiagram :rawChartData="rawChartData.chart1" :chartTitle="chartTitle" :downloadTitle="downloadTitle" :downloadFormat="downloadFormat"></LossDiagram>
        </div>
        <div v-else-if="chartSelected == 1" class="frame w-75">
          <TimeDiagram :rawChartData="rawChartData.chart1" :chartTitle="chartTitle" :downloadTitle="downloadTitle" :downloadFormat="downloadFormat"></TimeDiagram>
        </div>
        <div v-else class="frame w-75">
          <RamDiagram :rawChartData="rawChartData.chart1" :chartTitle="chartTitle" :downloadTitle="downloadTitle" :downloadFormat="downloadFormat"></RamDiagram>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import axios from 'axios';
import LossDiagram from './components/LossDiagram.vue'
import TimeDiagram from './components/TimeDiagram.vue'
import RamDiagram from './components/RamDiagram.vue'

export default {
  name: 'App',
  components: {
    LossDiagram,
    TimeDiagram,
    RamDiagram,
  },
  data() {
    return {
      imported: false,
      fileNames: {},
      selectedFiles: [],
      chartTitle: 'Wykres funkcji straty dla podanych wartości',
      chartSelected: 0,
      xRange: 10000,
      yRange: 200,
      rawChartData: {
        chart1: {},
      },
      downloadTitle: '',
      downloadFormat: 'png',
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

      this.nameDownloadFile();
    },

    toggleInput() {
      document.getElementById("settingsPanel").style.display = "none";
      document.getElementById("dataPanel").style.display = "flex";

      document.getElementById("dataSwitch").style.backgroundColor = "#DEF";
      document.getElementById("settingsSwitch").style.backgroundColor = "#BCE";
    },

    toggleSettings() {
      document.getElementById("dataPanel").style.display = "none";
      document.getElementById("settingsPanel").style.display = "flex";

      document.getElementById("dataSwitch").style.backgroundColor = "#BCE";
      document.getElementById("settingsSwitch").style.backgroundColor = "#DEF";
    },

    nameDownloadFile() {
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      month = month < 10 ? '0' + month : month;

      this.downloadTitle = `Wykres_${day}-${month}-${year}`;
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

.full-height {
  height:100vh;
}

.import-style {
  max-height: 300px;
  overflow-y: scroll;
  background-color: #789;
}

.file-element {
  background-color: #EEF;
  box-shadow: 2px 2px 2px black;
}

.toggle-data {
  background-color: #DEF;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.toggle-settings {
  background-color: #BCE;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.panel-data {
  height: 600px;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #BCE;
  display: flex;
  flex-direction: column;
  border: 1px solid #BCE
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

