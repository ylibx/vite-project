<template>
  <div id="container" ref="container"></div>
</template>
<script lang="ts" setup>
import mapJson from '../components/map.json'
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes'
import map1 from '../assets/images/map6.png'
import map2 from '../assets/images/map7.png'
import map3 from '../assets/images/map8.png'
import sca1 from '../assets/images/01.png'
import sca2 from '../assets/images/02.png'
import sca3 from '../assets/images/03.png'
import borderImg from '../assets/images/border.png'
import {Bar, Region, scatter} from '../entity/map'
import _default from "ant-design-vue/es/color-picker";
import value = _default.props.value;

type EchartsType = echarts.EChartsType
const container = ref<HTMLElement>()
//获取map容器
let myCharts: EchartsType | null = null
let regionData: Region[] = []
let scatterData: scatter[] = []
const images = [map1, map2, map3]
const scatterImg = ['image://' + sca1, 'image://' + sca2, 'image://' + sca3]
const effectScatterColor = [
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: 'rgba(108,234,240,1)'
    },
    {
      offset: 1,
      color: 'rgba(108,234,240,0.3)'
    }
  ]),
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: 'rgba(254,255,144,1)'
    },
    {
      offset: 1,
      color: 'rgba(254,255,144,0.3)'
    }
  ]),
  new echarts.graphic.LinearGradient(1, 0, 0, 0, [
    {
      offset: 0,
      color: 'rgba(219,0,0,1)'
    },
    {
      offset: 1,
      color: 'rgba(219,0,0,0.3)'
    }
  ])
]
const barColor = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(7,30,59,1)'
    },
    {
      offset: 1,
      color: 'rgba(108,234,240,0.3)'
    }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(7,30,59,1)'
    },
    {
      offset: 1,
      color: 'rgba(254,255,144,0.3)'
    }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: 'rgba(7,30,59,1)'
    },
    {
      offset: 1,
      color: 'rgba(219,0,0,1)'
    }
  ])
]
const barData:Bar[]=[]
const dataMap = new Map()
onMounted(() => {
  initMap()
})
const initMap = () => {
  if (container.value) {
    //echarts初始化
    myCharts = echarts.init(container.value)
    //显示加载动画效果，可以在加载数据前手动调用
    myCharts.showLoading('default', {
      text: '统计中，请稍后...',
      maskColor: '#2957a2',
      textColor: '#fff'
    })
    // 注册地图 geojson
    echarts.registerMap('map', mapJson.data as GeoJSONSourceInput)
    // 隐藏动画加载效果
    myCharts.hideLoading()
    //初始化数据
    setOptions()
    //echarts地图适配
    window.addEventListener('resize', handleResize)
  }
}
const setOptions = () => {
  if (mapJson) {
    mapJson.data.features.forEach(item => {
      const { name, gridLevel, CENTERX, CENTERY, registeredPopulationNumber, partyMemberNumber } = item.properties
      barData.push({
        name:name,
        value:partyMemberNumber,
        gridLevel:gridLevel
      })
      dataMap.set(name,[CENTERX, CENTERY])
      // {'一网格':[x,y],'二网格':[x,y]}
      scatterData.push({
        name: name,
        value: [CENTERX, CENTERY],
        gridLevel: gridLevel,
        partyMemberNumber: partyMemberNumber,
        registeredPopulationNumber: registeredPopulationNumber,
        img: scatterImg[gridLevel - 1]
      })
      regionData.push({
        name: name,
        gridLevel: gridLevel,
        itemStyle: {
          areaColor: {
            image: images[gridLevel - 1],
            repeat: 'repeat'
          },
          borderColor: '#3de0fa',
          borderWidth: 2
        }
      })
    })
  }
  const options = {
    geo: [
      {
        map: 'map', //指向注册地图名称
        aspectScale: 0.75,
        layoutCenter: ['50%', '42%'],
        layoutSize: '50%',
        itemStyle: {
          //图形描边颜色
          borderColor: 'rgba(25,50,86,0.5)',
          //描边线宽
          borderWidth: 5,
          //地图区域颜色
          areaColor: 'rgba(36,78,125,1)'
        },
        emphasis: {
          disabled: true
        },
        z: 1
      },
      {
        map: 'map', //指向注册地图名称
        aspectScale: 0.75,
        layoutCenter: ['49.6%', '41.6%'],
        layoutSize: '50%',
        itemStyle: {
          //图形描边颜色
          borderColor: 'rgba(25,50,86,0.5)',
          //描边线宽
          borderWidth: 5,
          //地图区域颜色
          areaColor: 'rgba(36,78,125,1)'
        },
        emphasis: {
          disabled: true
        },
        z: 2
      },
      {
        map: 'map', //指向注册地图名称
        aspectScale: 0.75,
        layoutCenter: ['49.2%', '41.2%'],
        layoutSize: '50%',
        itemStyle: {
          //图形描边颜色
          borderColor: 'rgba(25,50,86,0.5)',
          //描边线宽
          borderWidth: 5,
          //地图区域颜色
          areaColor: 'rgba(36,78,125,1)'
        },
        emphasis: {
          disabled: true
        },
        z: 3
      },
      {
        map: 'map', //指向注册地图名称
        aspectScale: 0.75,
        layoutCenter: ['48.8%', '40.8%'],
        layoutSize: '50%',
        regions: regionData,
        itemStyle: {
          shadowColor: '#4abcff',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          /*//图形描边颜色
          borderColor: 'rgba(62, 185, 217, 1)',
          //描边线宽
          borderWidth: 5,*/
          //地图区域颜色
          areaColor: {
            type: 'radial',
            x: 0.6,
            y: 0.6,
            r: 1.5,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(60,194,246,0)'
              },
              {
                offset: 1,
                color: 'rgba(60,194,246,1)'
              }
            ]
          }
        },
        emphasis: {
          disabled: true
        },
        z: 4
      },
      {
        map: 'map', //指向注册地图名称
        aspectScale: 0.75,
        layoutCenter: ['48.4%', '40.4%'],
        layoutSize: '50%',
        label: {
          show: true,
          color: '#fff',
          fontSize: 20
        },
        itemStyle: {
          borderColor: 'none',
          /*//图形描边颜色
          borderColor: 'rgba(62, 185, 217, 1)',
          //描边线宽
          borderWidth: 5,*/
          //地图区域颜色
          areaColor: {
            type: 'radial',
            x: 0.6,
            y: 0.6,
            r: 1.5,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(60,194,246,0)'
              },
              {
                offset: 1,
                color: 'rgba(60,194,246,1)'
              }
            ]
          }
        },
        emphasis: {
          itemStyle: {
            areaColor: {
              type: 'radial',
              x: 0.6,
              y: 0.6,
              r: 1.5,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(95,240,210,0)'
                },
                {
                  offset: 1,
                  color: 'rgba(95,240,210,1)'
                }
              ]
            }
          },
          label: {
            color: '#fff'
          }
        },
        z: 5
      }
    ],
    //lines 路径图 scatter 散点图 effectScatter 带有涟漪效果的散点图
    series: [
      {
        type:'lines',
        lineStyle:{
          width:7,
          color:(params:{data:{gridLevel:number}})=>{
            return barColor[params.data.gridLevel-1]
          },
          opacity:1,
          curveness:0
        },
        silent:true,
        data:getBarCoordData(),
        z:6
      },
      {
        type:'lines',
        effect:{
          show:true,
          //箭头指向速度，值越小速度越快
          period:4,
          //特效尾迹长度
          trailLength:0.2,
          //箭头图标
          symbol:'emptyCircle',
          symbolSize:3
        },
        lineStyle:{
          width:2,
          opacity:1,
          color:(params:{data:{gridLevel:number}})=>{
            return effectScatterColor[params.data.gridLevel-1]
          },
          type:'dotted',
          curveness: 0.3
        },
        data: getLineData(),
        z:6
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: (value: string[], params: { data: { img: string } }) => {
          // console.log('scatter==================', value, params)
          return params.data.img
        },
        symbolSize: [36, 25],
        symbolOffset: [0, 0],
        data: scatterData,
        z: 6
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        //涟漪特性相关配置
        rippleEffect: {
          //动画中波纹的最大缩放比例
          scale: 8,
          //博文的绘制方式 stroke fill
          brushType: 'fill'
        },
        //配置何时显示特性
        //render emphasis
        showEffectOn: 'render',
        itemStyle: {
          color: (params: { data: { gridLevel: number } }) => {
            return effectScatterColor[params.data.gridLevel - 1]
          }
        },
        symbol: 'circle',
        symbolSize: [10, 5],
        symbolOffset: [0, 0],
        data: scatterData,
        z: 7
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 1,
        label: {
          show: true,
          formatter: (params: { data: { registeredPopulationNumber: number; partyMemberNumber: number } }) => {
            return (
                '{a|' +
                '党员人数：' +
                params.data.partyMemberNumber +
                '}' +
                '\n' +
                '{a|' +
                '户籍人数' +
                params.data.registeredPopulationNumber +
                '}'
            )
          },
          rich: {
            a: {
              color: '#fff',
              fontSize: 16,
              lineHeight: 25
            }
          }
        },
        symbol: 'image://'+borderImg,
        symbolSize: [180, 70],
        symbolOffset: [0, -80],
        data: scatterData,
        z: 7
      }
    ]
  }
  myCharts?.setOption(options)
}
const getLineData =() =>{
  const result=[]
  for(const [fromName,fromCoords]of dataMap){
    for(const[toName,toCoords]of dataMap){
      if(fromName!==toName){
        result.push({
          fromName,
          toName,
          coords:[fromCoords,toCoords],
          gridLevel:barData.filter(item=>item.name === fromName)[0].gridLevel
        })
      }
    }
  }
  return result
}
const getBarCoordData =() =>{
   console.log(barData,dataMap,dataMap.get('第一网格'))
  const result = []
  //遍历方法
  for(const [name,coords]of dataMap){
    console.log(name,coords)
    const coordsNumber = coords.map(parseFloat)
    result.push({
      coords:[[...coordsNumber],[coordsNumber[0],coordsNumber[1]+0.005]],
      gridLevel:barData.filter(item=>item.name === name)[0].gridLevel
    })
  }
  return result
}
const handleResize = (option: any) => {
  myCharts?.setOption(option)
  myCharts?.resize()
}
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
  /*
  background-color: #11d290;
  */
  position: absolute;
  z-index: 1;
  /*pointer-events: none;*/
}
</style>
