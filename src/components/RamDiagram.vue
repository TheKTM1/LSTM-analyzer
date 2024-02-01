<template>
    <main class="d-flex flex-column align-items-end">
        <Bar :data="chartData" :chartTitle="chartTitle" :options="options"/>
        <button @click="downloadAsImage" style="width: fit-content;">Pobierz wykres</button>
    </main>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    name: 'RamDiagram',
    components: { Bar, Line },
    props: {
        rawChartData: Object,
        chartTitle: String,
    },
    data() {
        return {
            imageData: '',
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Liczba iteracji',
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Zużycie RAM [MB]',
                        }
                    }
                },
                layout: {
                    padding: 0,
                },
                plugins: {
                    title: {
                        text: this.chartTitle,
                        display: true,
                        font: {
                            size: 24,
                        },
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
                animation: {
                    onComplete: (event) => {
                        this.imageData = event.chart.toBase64Image('image/png', 1);
                    },
                },
            },
        }
    },
    computed: {
        chartData() {
            if (this.rawChartData.entries && this.rawChartData.entries.length > 0) {

                const chartColors = [
                    '#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#795548', '#FFC107', '#607D8B', '#FF5722', '#00BCD4',
                ];

                return {
                    labels: this.rawChartData.entries[0].iterations,
                    datasets: this.rawChartData.entries.map((entry, index) => ({
                        label: entry.name,
                        backgroundColor: chartColors[index % chartColors.length],
                        data: entry.ram_usage,
                    })),
                };
            } else {
                return {
                    labels: [],
                    datasets: [],
                };
            }
        },
    },
    methods: {
        downloadAsImage(){
            let downloadPrompt = document.createElement('a');

            downloadPrompt.href = this.imageData;
            downloadPrompt.download = `ramChart.png`;
            downloadPrompt.click()
        },
    },
}
</script>

