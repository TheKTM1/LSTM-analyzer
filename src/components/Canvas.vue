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
    name: 'Canvas',
    components: { Bar, Line },
    props: {
        labels: Array,
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'H_size = 100',
                        borderColor: '#0F0',
                        data: [40, 20, 12, 15, 14, 13, 18, 20, 0, 1, 4, 9, 8, 10, 6, 7, 18, 7, 60],
                    },
                    {
                        label: 'H_size = 200',
                        borderColor: '#0FF',
                        data: [42, 23, 10, 16, 5, 8, 19, 21, 0, 100, 50, 40, 3, 5, 41, 20, 40, 30, 20],
                    }
                ]
            },
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
                        text: 'Wykres',
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
}
</script>