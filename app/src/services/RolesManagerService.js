/**
 * Created by mapbar_front on 2019-04-11.
 */
import Request from './request'

export function getData (data = {}) {
  return Request.get('/ping', data)
}
export function generateVerifyCode (data = {}) {
  return Request.get('/generateVerifyCode', data)
}
// 登录
export function login (data) {
  return Request.post('/login', data)
}
// 退出
export function logout (data = {}) {
  return Request.get('/logout', data)
}
// 个人信息
export function information (data = {}) {
  return Request.get('/user/getInformation', data)
}
// 修改密码
export function resetPassword (data) {
  return Request.post('/user/updatePassword', data)
}
// 菜单
export function menuList (data = {}) {
  return Request.get('/menuList', data)
}
// 用户列表
export function userList (data = {}) {
  return Request.get('/user/list', data)
}
// 获取角色
export function getRoleList (data = {}) {
  return Request.get('/user/getCreateInfo', data)
}
// 修改用户
export function editUser (data = {}) {
  return Request.get('/user/show', data)
}
// 保存用户
export function submitUser (data) {
  return Request.post('/user/update', data)
}
// 角色列表
export function roleList (data = {}) {
  return Request.get('/role/list', data)
}
// 菜单树
export function addRoleList (data = {}) {
  return Request.get('/role/getCreateInfo', data)
}
// 修改角色
export function editRole (data = {}) {
  return Request.get('/role/show', data)
}
// 保存角色
export function submitRole (data) {
  return Request.post('/role/update', data)
}
// 删除角色
export function deltRole (data) {
  return Request.post('/role/delete', data)
}

// 公司管理-获得列表
export function companyList (data) {
  return Request.get('/company/list', data)
}

// 公司管理-获得API机构名称列表
export function companySelectCompany (data) {
  return Request.get('/company/select', data)
}

// 公司管理-去更新操作
export function companyToUpdate (data) {
  return Request.get('/company/show', data)
}

// 公司管理-修改
export function companyUpdate (data) {
  return Request.post('/company/update', data)
}

// 公司管理-去创建页面
export function companyToCreate (data) {
  return Request.get('/company/toCreate', data)
}

// 聚合机构-H5获得列表
export function convergeH5List (data) {
  return Request.get('/converge/h5List', data)
}

// 聚合机构-H5插入一条记录
export function convergeInsert (data) {
  return Request.post('/converge/insert', data)
}

// 聚合机构-聚合数据统计UV
export function convergeUvList (data) {
  return Request.get('/converge/uvList', data)
}

// 聚合机构-UV导出excel
export function convergeExportExcel (data) {
  return Request.get('/converge/export', data)
}

// 借款用户-api机构
export function companySelect (data) {
  return Request.get('/company/select', data)
}
// 获取借款用户list
export function loanList (data) {
  return Request.get('/loanUser/list', data)
}
// 借款用户-全部发送
export function sendToAll (data) {
  return Request.post('/loanUser/sendAll', data)
}

// 借款用户-部分发送
export function send (data) {
  return Request.post('/loanUser/send', data)
}
