import { BusinessPo } from '../common/base'

export interface AccountOrg extends BusinessPo {
	address: string
	bankAccount: string
	bankName: string
	contacts: string
	email: string
	fax: string
	fkLogoId: string
	fkOrgTypeDictId: string
	fkParentId: string
	latitude: number
	legalPerson: string
	logoPath: string
	longitude: string
	orgCode: string
	orgName: string
	phone: string
	rfOrgTypeDictName: string
	socialCreditCode: string
	sortCode: number
	workForce: number
}
