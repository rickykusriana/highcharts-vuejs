<template>
<div>

    <b-container fluid>
    <!-- <b-card-group deck> -->
        <div class="row">

            <div class="col-md-8">
                <div class="card">
                    <div class="card-footer">
                        <div class="row form-group mb-0">
                            <div class="col-sm-12 col-lg-2">
                                <div role="group" class="form-group">
                                    <label> Chart Type </label>
                                    <b-form-select
                                        id="inline-form-custom-select-pref"
                                        class="mb-2 mr-sm-2 mb-sm-0"
                                        v-model="chartType"
                                        :options="['Spline', 'AreaSpline', 'Line', 'Scatter', 'Column', 'Area']"
                                        :value="null">
                                    </b-form-select>
                                </div>
                            </div>

                            <div class="col-sm-12 col-lg-2">
                                <div role="group" class="form-group">
                                    <label> View Graph </label>
                                    <b-form-select
                                        id="inline-form-custom-select-pref"
                                        class="mb-2 mr-sm-2 mb-sm-0"
                                        v-model="selectedView"
                                        :options="['Monthly', 'Daily']">
                                    </b-form-select>
                                </div>
                            </div>

                            <div class="col-sm-12 col-lg-2">
                                <div role="group" class="form-group">
                                    <label> Year </label>
                                    <b-form-select v-model="selectedPeriod">
                                        <option v-for="(value, key) in listPeriod" :key="key">{{ value.year }}</option>
                                    </b-form-select>
                                </div>
                            </div>

                            <div v-if="selectedView == 'Daily'" class="col-sm-12 col-lg-2">
                                <div role="group" class="form-group">
                                    <label> Month </label>
                                    <b-form-select v-model="selectedMonth">
                                        <option value="">- Choose -</option>
                                        <option v-for="(value, key) in listMonth" :key="key" :value="key+1">{{ value }}</option>
                                    </b-form-select>
                                </div>
                            </div>

                            <!-- <div class="col-sm-12 col-lg-2">
                                <div role="group" class="form-group">
                                    <label> Filter Apps </label>
                                    <b-form-select v-model="selectedApplication">
                                        <option value="">- All -</option>
                                        <option v-for="(app, key) in listApplication" :key="key">{{ app.name }}</option>
                                    </b-form-select>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div class="card-body"> 
                        <highcharts style="width:100%;height: 600px;" class="chart" :options="chartOptions" :updateArgs="updateArgs" ref="chart"></highcharts>
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <b-card >
                    <b-card-text>
                    <highcharts style="width:100%;height: 600px;" class="chart" :options="wordCloud"></highcharts>
                    </b-card-text>
                </b-card>
            </div>
        </div>

    <!-- </b-card-group> -->

    <center>
            
        <!-- <div id="title">
            <h3>Set chart title dynamically:</h3>
            <input type="text" v-model="title">
        </div> -->

        <!-- <div id="animationDuration">
            <h3>Animation duration:</h3>
            <select v-model="animationDuration" type="number">
            <option>0</option>
            <option>500</option>
            <option>1000</option>
            <option>2000</option>
            </select>
        </div>
        <div id="seriesColor">
            <h3>Select color of the series:</h3>
            <div class="row">
                <input id="colorPicker" v-if="colorInputIsSupported" type="color" value="#6fcd98" v-model="seriesColor">
                <select v-else v-model="seriesColor">
                    <option>Red</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Pink</option>
                    <option>Orange</option>
                    <option>Brown</option>
                    <option>Black</option>
                    <option>Purple</option>
                </select>
            </div>
            <p>Current color: {{seriesColor}}</p>
        </div> -->

    </center>

    </b-container>
</div>
</template>

<script>

import Axios from 'axios'

export default {
    data () {
        return {

            // Chart 1
            api: 'https://api.ibstower.com/count_service/chart_all',
            title: '',
            chartType: 'Spline',
            selectedView: 'Monthly',

            paramUrl: { type: 1, year: this.get_date('year'), month: this.get_date('month') },
            
            listPeriod: [],
            selectedPeriod: this.get_date('year'),
            listMonth: [],
            selectedMonth: this.get_date('month'),
            listApplication: [],
            selectedApplication: '',

            points: [10, 0, 8, 2, 6, 4, 5, 5],
            seriesColor: '#6fcd98',
            colorInputIsSupported: null,
            animationDuration: 1000,
            updateArgs: [true, true, {duration: 1000}],
            
            chartOptions: {
                chart: {
                    type: 'spline',
                    events: {
                        load() {
                            this.showLoading();
                        }
                    }
                },
                title: {
                    text: 'Application Counter '+this.get_date('year')
                },
                subtitle: {
                    text: 'Monthly View'
                },
                lang: {
                    noData: "No Data"
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: 'Hits'
                    }
                },
                plotOptions: {
                    spline: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: true
                    }
                },
                tooltip: {
                    split: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                responsive: {  
                    rules: [{  
                    condition: {  
                        maxWidth: 500
                    },  
                    chartOptions: {  
                        legend: {  
                        enabled: false 
                        }  
                    }  
                    }]  
                },

                series: []

                // series: [{
                //     data: [],
                //     color: '#6fcd98'
                // }]
            },
            
            // Chart 2

            wordCloud: {
                chart: {
                    type: 'wordcloud'
                },
                credits: {
                    enabled: false
                },
                accessibility: {
                    screenReaderSection: {
                        beforeChartFormat: '<h5>{chartTitle}</h5>' +
                            '<div>{chartSubtitle}</div>' +
                            '<div>{chartLongdesc}</div>' +
                            '<div>{viewTableButton}</div>'
                    }
                },
                series: [{
                    type: 'wordcloud',
                    // data: [{'name': 'Lorem', 'weight': 2}, {'name': 'ipsum', 'weight': 1}],
                    data: [],
                    name: 'Total'
                }],
                title: {
                    text: 'Application in Wordcloud'
                }
            }
        }
    },

    created() {
        setTimeout(() => {
            // console.log(this.$refs.chart.chart)
            this.$refs.chart.chart.hideLoading();

            this.chartOptions.xAxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            this.get_chart()
        }, 1000)
        
        this.word_cloud()
    },

    mounted() {
        this.get_period()
        this.get_month()
    },

    methods: {
        
        shuffle: function(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },

        word_cloud: function() {                
            let self = this
            Axios.get('https://api.ibstower.com/count_service/chart_all')
                .then(response => {

                    Object.keys(this.shuffle(response.data)).forEach(key => {
                        // var count = 0;
                        self.wordCloud.series[0].data.push({
                            'name': response.data[key]['name'],
                            // 'weight': count += parseInt(response.data[key]['data'])
                        })
                    })

                    // console.log(count)
                })
                .catch(function(error) {
                    console.log(error.response.status)
                });
        },

        get_period: function() {
            let self = this
            Axios.get('https://api.ibstower.com/count_service/years')
                .then(response => {
                    self.listPeriod = response.data;
                })
                .catch(function(error) {
                    console.log(error.response.status)
                });
        },
        
        get_month: function() {
            let self = this
            self.listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        get_chart: function() {
            
            let url = this.api+'?type='+this.paramUrl.type+'&year='+this.paramUrl.year+'&month='+this.paramUrl.month
            
            let self = this
            Axios.get(url)
                .then(response => {
                    self.chartOptions.series = response.data;
                    self.listApplication = response.data;
                })
                .catch(function(error) {
                    console.log(error.response.status);
                    self.chartOptions.series = [];
                });
        },

        get_date: function(param) {
            var date = new Date();
            if (param == 'year') {
                return date.getFullYear();
            }
            else {
                return date.getMonth();
            }
        },

        // get_day: function(year, month) {
        //     return new Date(year, month, 0).getDate();
        // }
    },

    watch: {
        
        selectedView (newValue) {
            
            this.chartOptions.subtitle.text = newValue+' View'

            if (newValue == 'Daily') {
                this.chartOptions.xAxis.categories = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                this.paramUrl.type = 2
                this.get_chart()
            }
            else {
                this.chartOptions.xAxis.categories = this.listMonth
                this.paramUrl.type = 1
                this.get_chart()
            }
        },
        // selectedApplication (newValue) {
        //     this.chartOptions.subtitle.text = 'Filter : '+newValue
        //     this.api = 'https://api.ibstower.com/count_service/chart_all?name='+newValue
        //     this.get_chart(this.api)
        // },

        selectedPeriod (year) {
            this.chartOptions.title.text = 'Application Counter '+year
            this.paramUrl.year = year
            this.get_chart()
        },
        
        selectedMonth (month) {
            this.chartOptions.subtitle.text = 'Month : '+this.listMonth[month-1]
            this.paramUrl.month = month
            this.get_chart()
        },

        // 

        title (newValue) {
            this.chartOptions.title.text = newValue
        },
        points (newValue) {
            this.chartOptions.series[0].data = newValue
        },
        chartType (newValue) {
            this.chartOptions.chart.type = newValue.toLowerCase()
        },
        seriesColor (newValue) {
            this.chartOptions.series[0].color = newValue.toLowerCase()
        },
        animationDuration (newValue) {
            this.updateArgs[2].duration = Number(newValue)
        }
    }
}
</script>

<style>
/* .highcharts-legend{
display:none;
} */
</style>