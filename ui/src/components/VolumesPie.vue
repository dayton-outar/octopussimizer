<template>
  <div v-if="volumes" id="volumes-pie"></div>
</template>

<script>

export default {
  name: 'VolumesPie',
  props: ['volumes'],
  data() {
    return {
      pieChart: null
    }
  },
  watch: {
    volumes: function() { // watch it ... // newVal, oldVal
      window.Highcharts.chart('volumes-pie', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Volume Shares'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Stocks',
          colorByPoint: true,
          data: this.volumes
        }],
        credits: {
            enabled: false
        }   
    })
    }
  },
  mounted() {

  }
}

</script>