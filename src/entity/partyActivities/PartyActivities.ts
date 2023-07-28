import {BusinessPo} from "../common/base";

export interface PartyActivitiesVo extends BusinessPo{
    "activitiesNumber": number
    "activitiesRatio":number
    "fkRuralId":string
    "rfRuralName":string
    "statisticsMonth":string
}