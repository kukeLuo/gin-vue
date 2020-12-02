<template>
  <div >
    <div class="top">
        <el-divider direction="vertical" class=top-line></el-divider>
        
        <span class="top-text" id="title"><b>cpu性能检测</b></span>
                
    </div>
    <Row :gutter="16">
      <Col span="12">
        <VmChartBarLine title="CPU" :xAxisData="dataLine1.xAxisData" :series="dataLine1.series">
        </VmChartBarLine>
      </Col>
   
    </Row>

  </div>
</template>

<script>
  import VmChartBarLine from '@/components/chartBarLine/vm-chart-bar-line'
  export default {
    name: 'CpuDetail',
    components: {
      VmChartBarLine
    },
    data: function () {
      return {
          dataBar1: {
          xAxisData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          series: [
            {
              name: '销量',
              type: 'bar',
              data: [50, 200, 360, 100, 100, 200]
            }
          ]
        },
      }
    }
   }
</script>