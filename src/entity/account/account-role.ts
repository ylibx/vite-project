import { BusinessPo } from '../common/base'

export interface AccountRole extends BusinessPo {
	fkDeptId: string
	fkOrgId: string
	fkParentIds: string
	roleLevel: number
	roleName: string
	roleType: number
	sortCode: number
}
