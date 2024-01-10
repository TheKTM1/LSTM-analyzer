<template>
    <main>
        <h3></h3>
        <Line :data="chartData" :options="options"/>
    </main>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    name: 'LossDiagram',
    components: { Bar, Line },
    props: {
        rawChartData: Object,
    },
    data() {
        return {
            // chartData: {
            //     labels: this.rawChartData.entries[0].iterations,
            //     datasets: [
            //         {
            //             label: 'H_size = 100',
            //             borderColor: '#0F0',
            //             data: this.rawChartData.entries[0].loss,
            //         },
            //         {
            //             label: 'H_size = 200',
            //             borderColor: '#0FF',
            //             data: [42, 23, 10, 16, 5, 8, 19, 21, 0, 100, 50, 40, 3, 5, 41, 20, 40, 30, 20],
            //         }
            //     ]
            // },
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
                            text: 'Funkcja straty',
                        }
                    }
                },
                layout: {
                    padding: 0,
                },
                plugins: {
                    title: {
                        text: 'Wykres funkcji straty dla podanych wartości',
                        display: true,
                        font: {
                            size: 24,
                        },
                    },
                    legend: {
                        position: 'bottom',
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
                        borderColor: chartColors[index % chartColors.length],
                        data: entry.loss,
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
}
</script>