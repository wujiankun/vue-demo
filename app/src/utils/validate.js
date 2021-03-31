/**
 * Created by mapbar_front on 2019-01-24.
 */

// 机构中文名称自定义校验
function getLength (val) {
  let len = 0
  for (var i = 0; i < val.length; i++) {
    if (val.charCodeAt(i) > 127 || val.charCodeAt(i) === 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}
export function valideConvergeName (rule, value, callback) {
  if (!value) {
    callback(new Error('请填写机构中文名称'))
  } else {
    if (getLength(value) > 40) {
      callback(new Error('机构中文名称长度应该在40个字符以内'))
    } else {
      callback()
    }
  }
}

// 机构英文名称自定义校验
export function valideEnConvergeName (rule, value, callback) {
  const re = /^[a-zA-Z]+$/
  if (!re.test(value)) {
    callback(new Error('机构英文名称应该用英文表示'))
  } else if (value.length > 40) {
    callback(new Error('机构英文名称长度应该在40个字符以内'))
  } else {
    callback()
  }
}

// 机构地址自定义校验
export function valideConverAddress (rule, value, callback) {
  const re = /^(http|https):\/\//
  if (!re.test(value)) {
    callback(new Error('机构地址应该是一个合法的以http/https开头的地址'))
  } else {
    callback()
  }
}

// addEditUser页面：电话号码自定义校验
export function checkPhone (rule, value, callback) {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

// addEditUser页面：字断长度自定义校验
export function lengthVal (rule, value, callback) {
  if (!value || value.length > 40) {
    return callback(new Error('请填写长度在40以内的信息'))
  } else {
    callback()
  }
}

// addEditUser页面：workLengthVal
export function workLengthVal (rule, value, callback) {
  if (!value || value.length > 20) {
    return callback(new Error('请填写长度在20以内的信息'))
  } else {
    callback()
  }
}

// uam新增相关校验
// 1，手机号
export function phone (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}

// 2，邮箱
export function email (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的邮箱地址'))
    }
  }
}

// 3，日期验证 YYYY-MM-DD
export function date (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的日期格式（YYYY-MM-DD）'))
    }
  }
}

// 4，数字验证（实数）real number
export function realNumber (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^(-?\d+)(\.\d+)?$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入实数'))
    }
  }
}

// 5，数字验证（整数）integral number
export function integralNumber (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^[0-9]*$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入整数'))
    }
  }
}

// 6，时间校验
export function time (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\s([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的时间格式（YYYY-MM-DD hh:mm:ss）'))
    }
  }
}

// 身份证校验
export function idcard (rule, value, callback) {
  if (!value) {
    return callback()
  } else {
    const reg = /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[X|x]))$/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号码'))
    }
  }
}
export default {
  phone,
  email,
  date,
  realNumber,
  integralNumber,
  time,
  idcard
}
