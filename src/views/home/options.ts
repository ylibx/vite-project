/**
 * 颜色16进制转rgba颜色
 * @param hex 十六进制
 * @param opacity 透明度
 * rgba(255,255,255,255,0.5)
 * #ff ff ff
 */
function hexToRgba(hex: string, opactiy: number) {
    return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opactiy + ')'
}

/**
 * 多层圆环饼图
 */
export const setPieOption = (chartsData:{name:string;value:number}[]) => {
    // 默认测试数据
    const pieData = chartsData
    //第三个饼图的半径
    const radius = ['50%', '54%']
    //颜色系列
    const color = ['#37ffc9', '#ffe777', '#19d6ff', '#32a1ff', '#cccccc', '#ff1111']
    const color1: string[] = []
    const color2: string[] = []
    const color3: string[] = []
    color.forEach(item => {
        color1.push(item, 'transparent')
        color2.push(hexToRgba(item, 0.7), 'transparent')
        color3.push(hexToRgba(item, 0.4), 'transparent')
    })
    const pieDataList: any[] = []
    let sum = 0
    pieData.forEach(item => (sum += item.value))
    pieData.forEach(item => {
        pieDataList.push(item, {
            name: '',
            value: sum / 70,
            label: {
                show: false
            }
        })
    })
    /**
     * ['50%', '54%']
     * ['54%', '58%']
     * ['58%', '62%']
     */
    const radius2 = [Number(radius[1].split('%')[0]) + '%', Number(radius[1].split('%')[0]) + 4 + '%']
    const radius3 = [Number(radius[1].split('%')[0]) + 4 + '%', Number(radius[1].split('%')[0]) + 8 + '%']
    return {
        title: {
            text: sum,
            subtext: '党员数',
            x: 'center',
            y: '35.5%',
            itemGap: 5,
            textStyle: {
                color: '#fff',
                fontSize: 34,
                fontFamily: 'DS-DIGIT'
            },
            subtextStyle: {
                color: '#42B9FE',
                fontSize: 12
            }
        },
        tooltip: {
            show: true,
            formatter: (params: { name: string; value: string; percent: string }) => {
                if (params.name !== '') {
                    return params.name + ':' + params.value + '<br />' + '(' + params.percent + '%)'
                }
            }
        },
        series: [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius3,
                //hoverAnimation: false,
                startAngle: 90,
                // 选中模式
                selectedMode: 'single',
                selectedOffset: 0,
                itemStyle: {
                    color: (params: { dataIndex: number }) => {
                        return color1[params.dataIndex]
                    }
                },
                label: {
                    show: true,
                    position: 'outside',
                    color: '#fff',
                    lineHeight: 20,
                    formatter: (params: { name: string; percent: string }) => {
                        // return params.name + ':' + params.percent + '%'
                        return `${params.name}:\n${params.percent}%`
                    }
                },
                // 鼠标移入饼图hover
                emphasis: {
                    scale: 0
                },
                data: pieDataList,
                z: 666
            },
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius2,
                //hoverAnimation: false,
                startAngle: 90,
                // 选中模式
                selectedMode: 'single',
                selectedOffset: 0,
                itemStyle: {
                    color: (params: { dataIndex: number }) => {
                        return color2[params.dataIndex]
                    }
                },
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                // 鼠标移入饼图hover
                emphasis: {
                    scale: 0
                },
                data: pieDataList,
                z: 666
            },
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: radius,
                hoverAnimation: false,
                startAngle: 90,
                // 选中模式
                selectedMode: 'single',
                selectedOffset: 0,
                itemStyle: {
                    color: (params: { dataIndex: number }) => {
                        return color3[params.dataIndex]
                    }
                },
                label: {
                    show: false,
                    labelLine: {
                        show: false
                    }
                },
                data: pieDataList,
                z: 666
            }
        ]
    }
}

/**
 * 获取圆上某点的坐标
 * @param x0 表示x坐标
 * @param y0 表示y坐标
 * @param r 表示半径
 * @param angle 表示角度
 */
function getCirclePoint(x0: number, y0: number, r: number, angle: number) {
    const x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
    const y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
    return {
        x: x1,
        y: y1
    }
}

/**
 * 动态仪表盘
 */
export const setDashboardOptions = (angle: number) => {
    return {
        title: {
            text: '{valueStyle|' + '72' + '}{unitStyle|%}',
            x: 'center',
            y: 'center',
            textStyle: {
                rich: {
                    valueStyle: {
                        color: '#43b9fe',
                        fontSize: 34
                    },
                    unitStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                }
            }
        },
        series: [
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    return {
                        type: 'arc',
                        shape: {
                            // 定位、形状相关的设置
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: (Math.min(api.getWidth(), api.getHeight()) / 2.2) * (0.87 - 0.05),
                            startAngle: (angle * Math.PI) / 180,
                            endAngle: ((90 + angle) * Math.PI) / 180
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: 'transparent',
                            lineWidth: 1.5
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    return {
                        type: 'arc',
                        shape: {
                            // 定位、形状相关的设置
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: (Math.min(api.getWidth(), api.getHeight()) / 2.2) * (0.87 - 0.05),
                            startAngle: ((180 + angle) * Math.PI) / 180,
                            endAngle: ((270 + angle) * Math.PI) / 180
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: 'transparent',
                            lineWidth: 1.5
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    return {
                        type: 'arc',
                        shape: {
                            // 定位、形状相关的设置
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: (Math.min(api.getWidth(), api.getHeight()) / 2.2) * 0.87,
                            startAngle: ((270 + angle) * Math.PI) / 180,
                            endAngle: ((40 + angle) * Math.PI) / 180
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: 'transparent',
                            lineWidth: 1.5
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    return {
                        type: 'arc',
                        shape: {
                            // 定位、形状相关的设置
                            cx: api.getWidth() / 2,
                            cy: api.getHeight() / 2,
                            r: (Math.min(api.getWidth(), api.getHeight()) / 2.2) * 0.87,
                            startAngle: ((90 + angle) * Math.PI) / 180,
                            endAngle: ((220 + angle) * Math.PI) / 180
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: 'transparent',
                            lineWidth: 1.5
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    const x0 = api.getWidth() / 2
                    const y0 = api.getHeight() / 2
                    const r = (Math.min(api.getWidth(), api.getHeight()) / 2.2) * 0.87
                    const point = getCirclePoint(x0, y0, r, 90 - angle)
                    return {
                        type: 'circle',
                        shape: {
                            // 定位、形状相关的设置
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: '#0cd3db'
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'custom',
                coordinateSystem: 'none',
                renderItem: (params: any, api: any) => {
                    const x0 = api.getWidth() / 2
                    const y0 = api.getHeight() / 2
                    const r = (Math.min(api.getWidth(), api.getHeight()) / 2.2) * 0.87
                    const point = getCirclePoint(x0, y0, r, 270 - angle)
                    return {
                        type: 'circle',
                        shape: {
                            // 定位、形状相关的设置
                            cx: point.x,
                            cy: point.y,
                            r: 4
                        },
                        style: {
                            // 样式相关的设置
                            stroke: '#0cd3db',
                            fill: '#0cd3db'
                        },
                        // 不响应和触发鼠标事件
                        silent: true
                    }
                },
                data: [0]
            },
            {
                type: 'pie',
                radius: ['68%', '55%'],
                center: ['50%', '50%'],
                startAngle: 90,
                label: {
                    position: 'center'
                },
                silent: true,
                z: 0,
                zlevel: 0,
                data: [
                    {
                        name: '',
                        value: 72,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: {
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#4fadfd'
                                    },
                                    {
                                        offset: 1,
                                        color: '#38e8fa'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        name: '',
                        value: 100,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: '#173164'
                        }
                    }
                ]
            },
            {
                type: 'gauge',
                radius: '68%',
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 360,
                splitNumber: 8,
                // 刻度样式
                axisTick: {
                    show: false
                },
                axiLabel: {
                    show: false
                },
                pointer: {
                    show: false
                },
                splitLine: {
                    length: 160,
                    lineStyle: {
                        width: 3,
                        color: '#061740'
                    }
                },
                axisLine: {
                    show: false
                    // lineStyle: {
                    // 	opacity: 0
                    // }
                },
                detail: {
                    show: false
                },
                data: [
                    {
                        name: '',
                        value: 0
                    }
                ]
            }
        ]
    }
}
/**
 * 柱状图
 */
export const setBarOptions = (params:{ xAxisData: number[], seriesData: number[][] }) => {
    return {
        title: {
            text: '单位： 万元',
            left: '1%',
            top: '10.8%',
            textStyle: {
                color: '#fff',
                fontSize: 14,
                align: 'center'
            }
        },
        xAxis: {
            type: 'category',
            data: params.xAxisData,
            axisTick: {
                show: true
            },
            axisLine: {
                show: true,
                LineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 16,
                margin: 10
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                show: true,
                color: '#fff'
            },
            splitLine: {
                show: true,
                LineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        legend: {
            data: ['经营性收入', '经常性收入', '全区平均'],
            left: 100,
            top: 25,
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        tooltip: {
            show: true
        },
        grid: {
            left: '15%',
            right: '10%',
            top: '25%',
            bottom: '20%'
        }, // echarts和边缘的距离
        series: [
            {
                type: 'bar',
                name: '经营性收入',
                barWidth: 10,
                barCap: '90%',
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                    color: '#43b9fe'
                },
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                data: params.seriesData[0]
            },
            {
                type: 'bar',
                name: '全区平均',
                barWidth: 10,
                barCap: '90%',
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                    color: '#51ffc1'
                },
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                data:params.seriesData[1]
            },
            {
                name: '',
                type: 'bar',
                barWidth: '20',
                animationDuration: 2000,
                animationEasing: 'cubicInOut'
            },
            {
                type: 'bar',
                name: '经常性收入',
                barWidth: 10,
                barCap: '90%',
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                    color: '#f8af3c'
                },
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                data:params.seriesData[2]
            },
            {
                type: 'bar',
                name: '全区平均',
                barWidth: 10,
                barCap: '90%',
                itemStyle: {
                    borderRadius: [2, 2, 0, 0],
                    color: '#51ffc1'
                },
                animationDuration: 2000,
                animationEasing: 'cubicInOut',
                data:params.seriesData[3]
            }
        ]
    }
}

export const setProgressOption = (item:{name:string,value1:number,value2:number}[],index:number) => {
    return {
        grid: {
            top: 0,
            bottom: 0,
            left: '5.4%',
            right: '5.4%'
        },
        xAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, 0]
        },
        yAxis: [
            {
                type: 'category',
                data: [''],
                axisLine: { show: false },
                axisTick: [
                    {
                        show: false
                    }
                ]
            }
        ],
        series: [
            {
                type: 'bar',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        barBorderRadius: 30,
                        color: '#3AAEF1'
                    }
                },
                barWidth: 10,
                data: [item[index].value1]
            },
            {
                type: 'bar',
                barWidth: 10,
                barGap: '-100%',
                data: [item[index].value2],
                itemStyle: {
                    normal: {
                        color: '#123552',
                        barBorderRadius: 30
                    }
                }
            }
        ]
    }
}

export const setBarOptions1 = (params:number ) => {
    return {
        xAxis: {
            show: false
        },
        yAxis: [
            {
                show: true,
                data: 20,
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            {
                show: false,
                inverse: false,
                data: [0],
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: [100],
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#196EAE',
                        borderWidth: 2,
                        barBorderRadius: 15
                    }
                }
            },
            {
                name: '条',
                type: 'bar',
                data: [params],
                barWidth: 20,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: {
                            type: 'linear',
                            x: 0, //右
                            y: 0, //下
                            x2: 1, //左
                            y2: 0, //上
                            colorStops: [
                                {
                                    offset: 0,
                                    color: '#01E4FE' // 0% 处的颜色
                                },
                                {
                                    offset: 0.5,
                                    color: '#6AC9A3' // 70% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: '#F3A72D' // 100% 处的颜色
                                }
                            ]
                        }
                    }
                },
                label: {
                    normal: {
                        color: '#000',
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%'
                    }
                }
            }
        ]
    }
}

export const setLineOption = (chartsData: { xAxisData: string[]; seriesData: number[][] }) => {
    return {
        legend: {
            data: ['活动次数', '党员参与率'],
            right: '4%',
            top: '3%',
            itemWidth: 12,
            itemHeight: 6,
            icon: 'rect',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        xAxis: {
            boundaryGap: false,
            axisLabel: {
                color: '#fff',
                fontSize: 12,
                fontWeight: '500'
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width: 2.5
                }
            },
            data:chartsData.xAxisData
        },
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#fff'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#fff',
                        opacity: 0.5
                    }
                }
            },
            {
                type: 'value',
                minInterval: 20,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    fontSize: 12,
                    color: '#fff'
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                type: 'line',
                name: '活动次数',
                yAxisIndex: 0,
                symbol: 'none',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#42B7FB'
                            },
                            {
                                offset: 1,
                                color: '#0A193B'
                            }
                        ],
                        global: false
                    }
                },
                lineStyle: {
                    color: '#42B7FB'
                },
                data:chartsData.seriesData[0]
            },
            {
                type: 'line',
                name: '党员参与率',
                yAxisIndex: 1,
                symbol: 'none',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#4EF4BB'
                            },
                            {
                                offset: 0.7,
                                color: '#0A193B'
                            }
                        ],
                        global: false
                    }
                },
                lineStyle: {
                    color: '#4EF4BB'
                },
                data:chartsData.seriesData[1]
            }
        ],
        grid: {
            left: '12%',
            right: '10%',
            top: '25%',
            bottom: '20%'
        }
    }
}