import { BusinessPo } from '../common/base'

export interface AccountDept extends BusinessPo {
	//部门地址
	address: string
	//部门联系人
	contacts: string
	//部门编号
	deptCode: string
	deptLeader: string
	deptLevel: number
	deptName: string
	deptType: string
	email: string
	fax: string
	fkOrgId: string
	fkParentCode: string
	fkParentId: string
	phone: string
	phoneCornet: string
	sortCode: number
}
