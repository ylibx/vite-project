import {GetRequestModel, PostRequestModel, QueryType} from "../http/request-model";
import {DistributeVo, PersonnelDistributeVo} from "../entity/ruralIndex/ruralIndex";
import {CollectiveEconomyVo} from "../entity/collecteconomy/CollectiveEconomy";
import {DefiledIndexVo} from "../entity/defiledIndex/DefiledIndex";
import {PartyActivitiesVo} from "../entity/partyActivities/PartyActivities";
import {ProjectEvaluationVo} from "../entity/projectEvaluation/ProjectEvaluation";

const prefix = 'ruralIndex'

export  default {
    personnelDistribute: (query: QueryType) =>
        new GetRequestModel<Array<PersonnelDistributeVo>>(`${prefix}/getRuralPartyBranchPersonnelDistributeByFkRuralId?fkRuralId=${query}`).request(),
    collectiveEconomy: (query: QueryType) =>
        new GetRequestModel<Array<CollectiveEconomyVo>>(`${prefix}/getRuralCollectiveEconomyByFkRuralId?fkRuralId=${query}`).request(),
    defiledIndex:(query:QueryType)=>
        new GetRequestModel<DefiledIndexVo>(`${prefix}/getRuralDefiledIndexByFkRuralId?fkRuralId=${query}`).request(),
    partyActivitiesRatio:(query:QueryType)=>
        new GetRequestModel<PartyActivitiesVo[]>(`${prefix}/getRuralPartyActivitiesByFkRuralId?fkRuralId=${query}`).request(),
    projectEvaluation:(query:QueryType)=>
        new GetRequestModel<Array<ProjectEvaluationVo>>(`${prefix}/getRuralProjectEvaluationByFkRuralId?fkRuralId=${query}`).request()
}