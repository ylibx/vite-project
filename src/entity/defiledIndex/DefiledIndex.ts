import {BusinessPo} from "../common/base";

export interface DefiledIndexVo extends BusinessPo{
    "fkRuralId": string
    "gmtCreate": string
    "gmtModified": string
    "researchNumber": number
    "researchRatio": number
    "rfRuralName": string
    "satisfactionRatio": number
    "screeningNumber": number
    "screeningRatio": number
    "securityNumber": number
    "securityRatio": number
    "statisticsYear": number
    "visitNumber": number
    "visitRatio": number
}