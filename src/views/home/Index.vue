<template>
	<div>
		<screen-adapter>
			<div class="home">
				<!--顶部内容-->
				<div class="top-box">
					<!--顶部左侧内容-->
					<div class="t-left">
						<span class="t-left-title">百千万工程数据可视化驾驶舱123456</span>
						<span class="t-left-subtext">王店镇 南梅村1234</span>
					</div>
					<!--顶部右侧内容-->
					<div class="t-right">
						<span class="datetime">{{ currDateTime }}</span>
						<img src="@/assets/images/go-system.png" />
						<span class="go-system">
							<span>进入后台123</span>
						</span>
					</div>
				</div>
				<!--左侧内容-->
				<div class="left-box">
					<div class="left-1">
						<div class="img-box">
							<a-carousel autoplay :dots="true">
								<div v-for="(item, index) in photos" :key="'images' + index">
									<img :src="item" />
								</div>
							</a-carousel>
						</div>
						<div class="type-box">
							<img src="@/assets/images/left-right-1.png" />
							<img src="@/assets/images/left-right-2.png" />
							<img src="@/assets/images/left-right-3.png" />
						</div>
						<div class="left-2">
							<div class="left-2-item">
								<div class="value">{{ ruralInfo?.committeeManNumber }}/{{ ruralInfo?.committeeWomanNumber }}</div>
								<div class="text">班子/后备</div>
							</div>
							<div class="left-2-item">
								<div class="value">{{ ruralInfo?.populationNumber }}</div>
								<div class="text">总人口</div>
							</div>
							<div class="left-2-item">
								<div class="value">{{ ruralInfo?.floatingPopulationNumber }}</div>
								<div class="text">流动人口</div>
							</div>
						</div>
					</div>
					<div class="common-title">党组织情况</div>
					<div class="echarts-box">
						<Echarts v-if="pieOptions" :key="pieOptions" :id="'pie'" :width="'100%'" :options="pieOptions" :height="'100%'" />
					</div>
					<div class="tab-box">
						<ul>
							<li v-for="(item, index) in tabList" :key="item.typeName" :class="{ active: currTabIndex === index }" @click="onTabChange(index)">
								<img :src="item.icon" alt="" />
								<span>{{ item.typeName }}</span>
							</li>
						</ul>
					</div>
					<div class="echarts-box2">
						<Echarts
							v-if="Object.values(dashboardOptions).length > 0"
							:id="'dashboard'"
							:width="'100%'"
							:options="dashboardOptions"
							:height="'100%'"
						/>
					</div>
				</div>
				<!--右侧内容-->
				<div class="right-box">
					<div class="common-title">连心服务</div>
					<div class="box1">
						<div class="box-1-1" v-for="item in data1" :key="item">
							<div class="text">{{ item.name }}</div>
							<img class="line" src="@/assets/images/222@2x.png" />
							<img class="up" src="@/assets/images/up.png" />
							<div class="percent">{{ item.data1 }}</div>
							<div class="value">{{ item.data2 }}条</div>
						</div>
						<div class="echarts-box">
							<div class="text">群众满意率</div>
							<Echarts v-if="barOptions1" :key="barOptions1" :id="'bar5'" :width="'100%'" :options="barOptions1" :height="'100%'" />
						</div>
					</div>
					<div class="common-title">集体经济</div>
					<div class="echarts-box">
						<Echarts v-if="barOptions" :key="barOptions" :id="'bar'" :width="'100%'" :options="barOptions" :height="'200px'" />
					</div>
					<div class="common-title">党组织活动</div>
					<div class="echarts-box2">
						<Echarts v-if="lineOptions" :key="lineOptions" :id="'line'" :width="'100%'" :options="lineOptions" :height="'100%'" />
					</div>
				</div>
				<!--底部内容-->
				<div class="bottom-box">
					<div class="botton1">
						<div>
							<span>32</span>
							<span>荣誉分</span>
						</div>
						<div>
							<span>92</span>
							<span>总分</span>
						</div>
						<div>强基指数</div>
					</div>
					<p />
					<div class="bottom2">
						<div class="l-bottom">
							<div v-for="(item, index) in botList" :key="item">
								<div>{{ item.name }}</div>
								<div>
									<span>{{ item.value1 }}</span>
									<span>得分</span>
									<span>{{ item.value2 }}</span>
									<span>标准得分</span>
								</div>
								<div class="echarts-box">
									<Echarts :id="`load` + index" :width="'100%'" :height="'100%'" :options="initData(index)" />
								</div>
							</div>
						</div>
						<div class="r-bottom">
							<div class="t-box">
								<div>1</div>
								<div>镇排名</div>
							</div>
							<div class="b-box">
								<div>3</div>
								<div>区排名</div>
							</div>
						</div>
					</div>
				</div>
				<!--地图-->
				<echarts-map> </echarts-map>
			</div>
		</screen-adapter>
	</div>
</template>
<script setup lang="ts">
import ScreenAdapter from '../../components/ScreenAdapter.vue'
import { onMounted, ref, onUnmounted, reactive, toRaw } from 'vue'
import { formatByDate } from '../../utils/datetime-util'
import { COUNTRY_WEEK } from '../../enum/date'
import tabIcon1 from '../../assets/images/21341633685714_.pic@2x.png'
import tabIcon2 from '../../assets/images/21351633685776_.pic@2x.png'
import tabIcon3 from '../../assets/images/21361633685858_.pic@2x.png'
import tabIcon4 from '../../assets/images/21371633685909_.pic@2x.png'
import tabIcon5 from '../../assets/images/21381633685967_.pic@2x.png'
import tabIcon6 from '../../assets/images/21391633686010_.pic@2x.png'
import Echarts from '../../components/Echarts.vue'
import { setDashboardOptions, setPieOption, setBarOptions, setProgressOption, setBarOptions1, setLineOption } from './options'
import EchartsMap from '../../components/EchartsMap.vue'
import requestMethod from '../../api/login'
import { useSystemStore } from '../../store/system'
import { useUserStore } from '../../store/user'
import { messageMethod } from '../../utils/message-util'
import ruralInfoRequest from '../../api/ruralInfo'
import { BaseUtil } from '../../utils/base-util'
import { RuralInfo } from '../../entity/ruralInfo/ruralInfo'
import ruralIndexRequest from '../../api/ruralIndex'
import { PersonnelDistributeVo } from '../../entity/ruralIndex/ruralIndex'
// 当前日期时间
const currDateTime = ref('')
// 时间定时器
const currTimeInte = ref()
//轮播图数组
const photos = ref<string[]>([])
//党组织情况options
let pieOptions = ref({})
//党组织情况分类的options
let dashboardOptions = ref({})
// 集体经济options
const barOptions = ref({})
//连心服务options
const barOptions1 = ref({})
//党组织活动options
const lineOptions = ref({})
//底部options
const progressOptions = ref()
// 当前选中tab的下标
const currTabIndex = ref(0)
// tab数据
const tabList = ref<PersonnelDistributeVo[]>([])
//bottom数据
const botList = ref<{ name: string; value1: number; value2: number }[]>([])
let requestId = 0
//
const initData = (index: number) => {
	progressOptions.value = setProgressOption(toRaw(botList.value), index)
	return progressOptions.value
}
// 动画事件
const requestAnimation = (angle: number) => {
	cancelAnimationFrame(requestId)
	angle += 1
	dashboardOptions.value = setDashboardOptions(angle)
	requestId = requestAnimationFrame(() => {
		requestAnimation(angle)
	})
}
const loginParams = {
	userAccount: 'admin',
	password: '111111'
}

onMounted(async () => {
	//获取当前的日期和时间以及星期
	const week = COUNTRY_WEEK.CN[formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').week]
	currTimeInte.value = setInterval(() => {
		let datetime = formatByDate(new Date(), 'yyyy年MM月dd日 HH:mm:ss').text
		currDateTime.value = datetime + week
	}, 1000)
	getDashboard()
	await login()
	await getRuralInfo()
	await getPersonnelDistribute()
	await getDefiledIndex()
	await getCollectiveEconomy()
	await getPartyActivities()
	await getProjectEvaluation()
})
//使用系统存储
const systemStore = useSystemStore()
//使用用户信息存储
const userStore = useUserStore()
const fkRuralId = ref<string | undefined>('')
//农村详情信息
const ruralInfo = ref<RuralInfo>()
const login = async () => {
	await requestMethod.login(loginParams).then(({ data }) => {
		// console.log(data)
		systemStore.setToken(data.authToken)
		userStore.setInfo(data)
		messageMethod.success('登录成功')
	})
}
//农村id
const getRuralInfo = async () => {
	await ruralInfoRequest.page({ pageNum: 1, pageSize: 10, rfRuralName: '测试村' }).then(({ data }) => {
		console.log(data.list[0])
		ruralInfo.value = data.list[0]
		fkRuralId.value = ruralInfo.value?.fkRuralId
		const photosList: string[] =
			ruralInfo.value?.groupPhoto === ''
				? ruralInfo.value?.centerPhoto.split(',')
				: ruralInfo.value?.groupPhoto.split(',').concat(ruralInfo.value?.centerPhoto.split(','))
		photos.value = photosList.map(item => BaseUtil.getUploadPath(item))
	})
}
//
//获取党员分布情况
const getPersonnelDistribute = async () => {
	await ruralIndexRequest.personnelDistribute(fkRuralId.value).then(({ data }) => {
		console.log(data)
		const icons = [tabIcon1, tabIcon4, tabIcon3, tabIcon5, tabIcon2, tabIcon6]
		tabList.value = data
		tabList.value.forEach((item: PersonnelDistributeVo, index: number) => {
			item.icon = icons[index]
		})
		const chartsData = tabList.value[currTabIndex.value].distributeList.map(item => {
			return {
				name: item.distributionIntervalName,
				value: item.distributionNumber
			}
		})
		pieOptions.value = setPieOption(chartsData)
	})
}
//获取连心服务数据
let data1 = ref<{ name: string; data1: number; data2: number }[]>([])
const getDefiledIndex = async () => {
	await ruralIndexRequest.defiledIndex(fkRuralId.value).then(({ data }) => {
		console.log(data)
		data1.value.push({
			name: '微走访',
			data1: data.visitNumber,
			data2: data.visitRatio
		})
		data1.value.push({
			name: '微力量',
			data1: data.screeningNumber,
			data2: data.screeningRatio
		})
		data1.value.push({
			name: '微民情',
			data1: data.securityNumber,
			data2: data.securityRatio
		})
		data1.value.push({
			name: '微办事',
			data1: data.researchNumber,
			data2: data.researchRatio
		})
		const satisfactionRatio = data.satisfactionRatio
		barOptions1.value = setBarOptions1(satisfactionRatio)
	})
}
//集体经济数据
const getCollectiveEconomy = async () => {
	await ruralIndexRequest.collectiveEconomy(fkRuralId.value).then(({ data }) => {
		const statisticsYear = data.map(item => item.statisticsYear)
		const operatingIncome = data.map(item => item.operatingIncome)
		const operatingAverageIncome = data.map(item => item.operatingAverageIncome)
		const recurringIncome = data.map(item => item.recurringIncome)
		const recurringAverageIncome = data.map(item => item.recurringAverageIncome)
		barOptions.value = setBarOptions({
			xAxisData: statisticsYear,
			seriesData: [operatingIncome, operatingAverageIncome, recurringIncome, recurringAverageIncome]
		})
	})
}
//党员活动数据
const getPartyActivities = async () => {
	await ruralIndexRequest.partyActivitiesRatio(fkRuralId.value).then(({ data }) => {
		console.log(data)
		const activitiesNumber = data.map(item => item.activitiesNumber)
		const activitiesRatio = data.map(item => item.activitiesRatio)
		const statisticsMonth = data.map(item => item.statisticsMonth.substring(5))
		lineOptions.value = setLineOption({
			xAxisData: statisticsMonth,
			seriesData: [activitiesNumber, activitiesRatio]
		})
	})
}
//强基指数
const getProjectEvaluation = async () => {
	await ruralIndexRequest.projectEvaluation(fkRuralId.value).then(({ data }) => {
		console.log(data)
		data.map(item => {
			botList.value.push({
				name: item.typeName,
				value1: item.evaluationScore,
				value2: item.criteriaScore
			})
		})
	})
}

/**
 *  获取党员活动参与率数据
 */
function getDashboard() {
	dashboardOptions.value = setDashboardOptions(0)
	requestAnimation(0)
}

/**
 * 点击tab切换
 */
function onTabChange(index: number) {
	currTabIndex.value = index
	if (currTabIndex.value != undefined) {
		const chartsData = tabList.value[currTabIndex.value].distributeList.map(item => {
			return {
				name: item.distributionIntervalName,
				value: item.distributionNumber
			}
		})
		pieOptions.value = setPieOption(chartsData)
	}
}

// 组件卸载完成后执行的函数
onUnmounted(() => {
	cancelAnimationFrame(requestId)
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixins.scss';

$boxBgColor: rgba(0, 0, 0, 0.08);
$valueColors: #43b9fe #f8af3c #51ffc1;
.common-title {
	border: 1px solid red;
	@include wh(228px, 52px);
	background: url('@/assets/images/t_bg.png') no-repeat;
	background-size: 100% 100%;
	text-align: center;
	line-height: 52px;
	@include fontmixin(24px, 400, #c7e6ff);
	letter-spacing: 6px;
}

.home {
	@include wh(100%, 100%);
	background: url('@/assets/images/bg.png') no-repeat;
	background-size: 100% 100%;
	color: #ffffff;

	.top-box {
		position: absolute;
		width: 100%;
		@include flexmixin(space-between, center);
		padding: 43px 23px 24px 53px;

		.t-left {
			border: 1px solid red;

			.t-left-title {
				@include fontmixin(48px, 800);
				margin-right: 22px;
				letter-spacing: 6px;
			}

			.t-left-subtext {
				@include fontmixin(28px, 724);
				letter-spacing: 6px;
			}
		}

		.t-right {
			display: flex;
			align-items: center;
			border: 1px solid red;

			.datetime {
				@include fontmixin(18px, 500);
				letter-spacing: 6px;
			}

			img {
				@include wh(36px, 36px);
				margin: 0 7px 0 18px;
			}

			.go-system {
				@include fontmixin(21px, 700);

				&:after {
					content: '';
					display: inline-block;
					@include wh(11px, 12px);
					background: url('@/assets/images/arrow-right.png') no-repeat;
					background-size: 100% 100%;
					margin-left: 7.6px;
				}
			}
		}
	}

	.left-box,
	.right-box {
		border: 1px solid red;
		@include wh(447px, 930px);
		position: absolute;
		top: 113px;
		z-index: 2;
		background-color: $boxBgColor;
		padding: 12px 13px;
	}

	.left-box {
		left: 37px;

		.left-1 {
			.img-box {
				@include wh(319px, 186px);
				display: inline-block;
				vertical-align: middle;
				border: 1px solid #cbedff;
				background-color: rgba(0, 0, 0, 0.2);
				padding: 12px 11px;

				:deep(.ant-carousel) {
					.slick-slide img {
						@include wh(297px, 162px);
					}
				}
			}

			.type-box {
				border: 1px solid red;
				margin-left: 20px;
				display: inline-block;
				vertical-align: middle;

				& > img {
					@include wh(61.3px, 44.8px);
					margin-bottom: 20px;
					display: table;
				}

				img:last-child {
					margin-bottom: 0;
				}
			}
		}

		.left-2 {
			border: 1px solid red;
			@include flexmixin(space-around, center);
			margin: 49px 0;
			@each $color in ($valueColors) {
				$index: index($valueColors, $color);
				.left-2-item:nth-child(#{$index}) {
					.value {
						@include fontmixin(40px, 400, $color);
						font-family: DS-DIGIT;
						letter-spacing: 4px;
						line-height: 40px;
					}

					.text {
						font-size: 12.88px;
					}
				}
			}
		}

		.echarts-box {
			border: 1px solid red;
			@include wh(100%, 247px);
		}

		.tab-box {
			width: 100%;

			ul {
				margin: 0;
				padding: 0;
				text-align: center;

				& > li {
					margin-left: -1px;
				}

				& li:first-child {
					margin-left: 0;
				}

				li {
					display: inline-block;
					border: 1px solid #42b9fe;
					cursor: pointer; //有点击事件，变成一只小手
					padding: 6px 9px;

					img,
					span {
						vertical-align: middle;
					}

					img {
						margin-right: 2px;
					}
				}

				.active {
					background-color: #11d290;
					border: 1px solid #11d290;
					color: #fff;
				}
			}
		}

		.echarts-box2 {
			@include wh(100%, 260px);
		}
	}
}

.right-box {
	right: 37px;

	.box1 {
		@include wh(447px, 300px);
		display: flex;
		flex-direction: column;
		align-items: center;

		& > .box-1-1:nth-child(2),
		& > .box-1-1:nth-child(4) {
			/* 选择第一个和第三个子元素 */
			.text {
				background-color: #45bdfe;
			}
		}

		& > .box-1-1:nth-child(1),
		& > .box-1-1:nth-child(3) {
			/* 选择第二个和第四个子元素 */
			.text {
				background-color: #f1ac40;
			}
		}

		.box-1-1 {
			@include wh(398px, 44px);
			display: flex;
			align-items: center;
			background-color: RGBA(23, 90, 146, 0.2);
			background-size: 100% 100%;
			margin-top: 16px;

			.text {
				@include fontmixin(16px, 500, #0b1d41);
				@include wh(72px, 26px);
				margin-left: 16px;
				border-radius: 5px;
				text-align: center;
			}

			.line {
				margin-left: 13px;
			}

			.up {
				margin-left: 23px;
			}

			.percent {
				@include fontmixin(18px, 400, #3ad8d8);
				margin-left: 3px;
			}

			.value {
				@include fontmixin(19px, 500, #42b9fe);
				margin-left: 17px;
			}
		}

		.echarts-box {
			margin-top: 16px;
			@include wh(398px, 80px);
			display: flex;
			align-items: center;

			.text {
				@include wh(150px, 30px);
				margin-top: -10px;
				@include fontmixin(16px, 700px, #fff);
			}
		}
	}

	.echarts-box {
		@include wh(100%, 255px);
	}

	.echarts-box2 {
		@include wh(100%, 224px);
	}
}

.bottom-box {
	@include wh(905px, 327px);
	position: absolute;
	top: 717px;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: $boxBgColor;

	.botton1 {
		@include wh(905px, 81px);
		display: flex;

		div:nth-child(1) {
			@include wh(128px, 81px);
			margin-left: 20px;
			margin-top: 18px;

			span:nth-child(1) {
				@include fontmixin(35px, 400, #2bdaf2);
				font-family: DS-DIGF;
				padding-left: 15px;
			}

			span:nth-child(2) {
				@include fontmixin(13px, 800, #ffffff);
				margin-left: 10px;
			}
		}

		div:nth-child(2) {
			@include wh(128px, 81px);
			margin-left: 20px;
			margin-top: 18px;

			span:nth-child(1) {
				@include fontmixin(35px, 400, #2bdaf2);
				font-family: DS-DIGF;
				padding-left: 15px;
			}

			span:nth-child(2) {
				@include fontmixin(13px, 800, #ffffff);
				margin-left: 10px;
			}
		}

		div:nth-child(3) {
			@include fontmixin(24px, bold, #c7e6ff);
			margin-top: 18px;
			margin-left: 459px;
		}
	}

	p {
		border: 2px #a0d3ff solid;
		opacity: 0.2;
	}

	.bottom2 {
		@include wh(905px, 244px);
		display: flex;

		.l-bottom {
			@include wh(684px, 244px);
			display: grid;
			grid-template-rows: repeat(2, 80px);
			grid-template-columns: repeat(2, 319px);
			grid-gap: 46px 27px;
			margin-top: 20px;
			margin-left: 54px;

			div:nth-child(1) {
				@include fontmixin(14px, 500, #ffffff);
				margin-bottom: -4px;
			}

			div:nth-child(2) {
				span:nth-child(1) {
					@include fontmixin(30px, 400, #3eb4f7);
					font-family: DS-DIGF;
				}

				span:nth-child(2) {
					@include fontmixin(12px, 500, #c7e6ff);
					margin-left: 11px;
				}

				span:nth-child(3) {
					@include fontmixin(30px, 400, #f8af3c);
					font-family: DS-DIGF;
					margin-left: 41px;
				}

				span:nth-child(4) {
					@include fontmixin(12px, 500, #c7e6ff);
					margin-left: 11px;
				}
			}

			.echarts-box {
				@include wh(319px, 18px);
				background: url('@/assets/images/bar-bg.png') no-repeat;
			}
		}

		.r-bottom {
			@include wh(86.3px, 244px);
			display: grid;
			grid-template-rows: repeat(2, 120px);
			grid-gap: 4px;
			margin-left: 785px;
			position: absolute;

			.t-box {
				margin-top: 30px;
				background: url('@/assets/images/shui1.png') no-repeat;

				div:nth-child(1) {
					@include fontmixin(21px, bold, #fefefe);
					margin-left: 38px;
					margin-top: 17px;
				}

				div:nth-child(2) {
					@include fontmixin(13px, bold, #fefefe);
					margin-left: 24px;
					margin-top: -5px;
				}
			}

			.b-box {
				margin-top: 30px;
				background: url('@/assets/images/shui2.png') no-repeat;

				div:nth-child(1) {
					@include fontmixin(21px, bold, #fefefe);
					margin-left: 38px;
					margin-top: 17px;
				}

				div:nth-child(2) {
					@include fontmixin(13px, bold, #fefefe);
					margin-left: 24px;
					margin-top: -5px;
				}
			}
		}
	}
}
</style>
