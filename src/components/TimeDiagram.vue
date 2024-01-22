<template>
    <main>
        <h3></h3>
        <Line :data="chartData" :chartTitle="chartTitle" :options="options"/>
    </main>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
    name: 'TimeDiagram',
    components: { Bar, Line },
    props: {
        rawChartData: Object,
        chartTitle: String,
    },
    data() {
        return {
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
                            text: 'Czas [s]',
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
                        data: entry.time_total,
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