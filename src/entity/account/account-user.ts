import { BusinessPo } from '../common/base'
import { AccountDept } from './account-dept'
import { AccountRole } from './account-role'
import { AccountOrg } from './account-org'
export interface AccountUserVo extends AccountUser {
	userInfo: AccountUserInfo[]
	deptList: AccountDept[]
	roleList: AccountRole[]
	orgList: AccountOrg[]
	thirdPartyAccountList: []
	permissionMap: { [key: string]: string }
	authToken: string
	deptNames: string
	orgNames: string
	headPath: string
	roleNames: string
}

export interface AccountUser extends BusinessPo {
	//用户激活状态 0：禁用 1：激活 2：待审核 3：锁定
	activeStatus: 0 | 1 | 2 | 3
	regIp: string
	siteCode: string
	userAccount: string
	userName: string
	userPassword: string
	userType: 0 | 1
}
export interface AccountUserInfo {
	address: string
	email: string
	fkHeadId: string
	fkPositionDictId: string
	fkUserId: string
	headPath: string
	idCard: string
	openId: string
	phone: string
	qq: string
	rfPositionDictName: string
	//性别 0默认 1男 2女
	sex: 0 | 1 | 2
	sortCode: number
	userInfoCode: string
	userInfoName: string
	wechat: string
	workNumber: string
	workingDate: string
}
