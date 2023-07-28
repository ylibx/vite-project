export interface BasePo{
    id:string
    //主键id
    gmCreate?:string
    //创建时间
    gmModified?:string
    //修改时间
}
export interface BusinessPo extends BasePo{
    //创建人id
    createUserId?:string
    //创建人姓名
    createUserName?:string
    //修改人id
    updateUserId?:string
    //修改人姓名
    updateUserName?:string
    //状态 0默认，1删除
    isDeleted:0|1
    //乐观锁
    version?:number
    //备注
    memo?:string
}