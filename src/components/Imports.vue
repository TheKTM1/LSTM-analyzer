<template>
    <main class="d-flex flex-column justify-content-around align-items-center w-100 h-100">
        <h3>Import danych</h3>
        <button @click="displayImport">Zaimportuj plik</button>
        <div v-if="imported" class="inner">
            <div v-for="(fileName, key) in fileNames" :key="key" class="py-2">
                <div class="btn btn-light w-75"> {{ fileName }} </div>
            </div>
        </div>
        <div v-else>
            <p>
                Nie zaimportowano żadnych danych.
            </p>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Imports',
    data() {
        return {
            imported: false,
            fileNames: {},
        }
    },
    methods: {
        async displayImport(){

            const response = await axios({
                method: 'GET',
                url: "http://localhost:6790/api/get-files",
                timeout: 3000,
            })
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    this.fileNames[i] = response.data[i];
                }

                this.imported = true;
            })
            .catch(error => console.error(`Błąd: ${error}.`));
        },
    },
}
</script>

<style>
.inner {
    width: 100%;
    background-color: #BCD;
    border-radius: 0.5rem;
}
.card {
    
}
</style>