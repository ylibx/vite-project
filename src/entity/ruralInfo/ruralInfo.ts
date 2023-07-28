import {BusinessPo} from "../common/base";

export interface RuralInfo extends BusinessPo{
    centerPhoto:string//服务中心图片
    committeeManNumber:number//两委男班子数
    committeeNumber:number//两委班子数
    committeeWomanNumber:number//两委女班子数
    createUserName:string//创建人姓名
    fkRuralId:string//农村id
    floatingPopulationNumber:number//流动人口数
    gmtCreate:string//创建时间
    gmtModified:string//修改时间
    gridNumber:number //网格数
    groupPhoto: string//集体照
    honorPoints:number//强基指数荣誉分
    householdsNumber:number//户数
    microGridNumber:number//微网格数
    partyActivitiesRatio:number//党员活动平均参与率%
    partyMemberNumber:number//党员人数
    populationNumber:number//总人口数
    registeredPopulationNumber:number//户籍人口数
    residentsPopulationNumber:number//常住人口数
    rfRuralName:string//农村名称
    secretaryHonor:string//党组织书记荣誉
    secretaryName:string//党组织书记姓名
    secretaryPhoto:string//党组织书记照片
    secretaryTag:string//党组织书记标签
    updateUserName:string//修改人姓名

}