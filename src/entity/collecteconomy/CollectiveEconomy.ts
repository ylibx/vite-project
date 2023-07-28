import {BusinessPo} from "../common/base";

/**
 * 集体经济实体类
 */
export interface CollectiveEconomyVo extends BusinessPo {
   // 全区平均/万元
   averageIncome: number
   // 农村id
   fkRuralId: string
   // 经营性收入全区平均/万元
   operatingAverageIncome: number
   // 经营性收入/万元
   operatingIncome: number
   // 经常性收入全区平均/万元
   recurringAverageIncome: number
   // 经常性收入/万元
   recurringIncome: number
   // 农村名称
   rfRuralName: string
   // 年份
   statisticsYear: number
}