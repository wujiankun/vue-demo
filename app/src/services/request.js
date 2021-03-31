import axios from 'axios'
import Config from '../index.config'
import { Message } from 'element-ui'
const proxyUrl = Config.proxyUrl

// 服务端异常码处理
function AbnormalCodeProcessing (data) {
  if (data.code === 0) {
    return 0
  }
  if (data.code === 500) {
    Message.error(data.msg)
  } else if (data.code === 10030) {
    Message.error(data.msg)
    localStorage.removeItem('Authorization')
    localStorage.removeItem('sitePassword')
    window.location.href = location.origin
    // router.$router.push('/');
  } else if (data.code === 10010) {
    Message.error(data.msg)
  } else if (data.code === 400) {
    Message.warning(data.msg)
  } else if (data.code) {
    Message.error(data.msg)
  }
}

// 为空数据清洗
function dataDeal (config) {
  if (!config.data || isEmptyObj(config.data)) {
    delete config.data
  } else {
    config.data = isFormData(config.data) ? formDataFilter(config.data) : jsonFilter(config.data)
  }
  if (!config.params || isEmptyObj(config.params)) {
    delete config.params
  } else {
    config.params = isFormData(config.params) ? formDataFilter(config.params) : jsonFilter(config.params)
  }
  return config
}

function jsonFilter (obj) {
  for (const i in obj) {
    if (obj[i] === null || obj[i] === undefined || obj[i] === '') {
      delete obj[i]
    }
  }
  return obj
}

function formDataFilter (formData) {
  for (const key of formData.keys()) {
    if (!formData.get(key)) {
      formData.delete(key)
    }
  }
  return formData
}

function isEmptyObj (obj) {
  const isEmpty = Object.keys(obj) > 0
  // isEmpty = Boolean(Object.keys(obj).length)
  return isEmpty
}

function isFormData (obj) {
  return obj instanceof FormData
}

function request (options) {
  const opts = {
    withCredentials: true,
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: localStorage.getItem('Authorization')
    }
  }
  opts.url = /^(http|https):\/\//.test(options.url) ? options.url : proxyUrl + options.url
  if (options.method.toLowerCase() === 'post') {
    opts.method = 'post'
    opts.data = options.data
    if (options.data.isUpload) {
      opts.headers['Content-Type'] = 'multipart/form-data'
      if (options.data instanceof FormData) {
        opts.data = options.data
      } else {
        const formdata = new FormData()
        Object.keys(options.data).forEach(item => {
          if (options.data[item] !== '') {
            formdata.append(item, options.data[item])
          }
        })
        opts.data = formdata
      }
    }
  } else {
    opts.method = 'get'
    opts.params = options.data
  }
  const config = dataDeal(opts)
  return axios.request(config).then(res => {
    return res.data
  }).catch(err => {
    console.log(err)
  })
}

export default {
  get: function (url, data) {
    return request({
      method: 'GET',
      url,
      data: Object.assign({}, data)
    })
  },
  post: function (url, data) {
    return request({
      url,
      data,
      method: 'POST'
    })
  },
  request
}

axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    AbnormalCodeProcessing(response.data)
    return response
  } else {
    Message.error('error code ' + response.status)
  }
  return response
}, function (error) {
  Message.error(error.toString())
  return Promise.reject(error)
})

axios.interceptors.request.use(function (config) {
  config = dataDeal(config)
  return config
}, function (error) {
  Message.error(error.toString())
  return Promise.reject(error)
})
