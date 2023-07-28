import { BusinessPo } from '../common/base'

export interface AccountThirdParty extends BusinessPo {
	appOpenId: string
	appType: string
	appUserId: string
	appUserName: string
	fkUserId: string
}
