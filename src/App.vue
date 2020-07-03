<template>
    <div id="app">
        <navbar/>
        <br>
        <keep-alive>
            <component :is="currentView"></component>
        </keep-alive>

    </div>
</template>

<script>

import Navbar from './components/Navbar.vue'
import Chart from './components/Chart.vue'

export default {
    name: 'app',
    data() {
        return {
            selected: 'chart',
            currentView: 'chart'
        }
    },
    components: {
        chart: Chart,
        navbar: Navbar 
    }
}
</script>