import {BusinessPo} from "../common/base";

export interface ProjectEvaluationVo extends BusinessPo{
    "criteriaScore":number
    "evaluationScore": number
    "fkApprovalId": string
    "fkRuralId": string
    "fkTypeId": string
    "rfRuralName": string
    "statisticsYear": number
    "typeName": string
}