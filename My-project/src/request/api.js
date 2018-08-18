/*
  @description api接口
  @author jhuang
  @date 2018-5-28
*/
import axios from 'axios'
// import pg from 'path-to-regexp'
import qs from 'qs'
// import qs from 'querystring'
import { message } from 'antd'

// 生产环境和开发环境作区分
const base_URl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/airui' : 'http://localhost:3000/airui'

/**
 * @description 将路径编辑成路由
 * @param {*} regex
 * @param {*} params
 * @private
 */
// function toPath(regex, params) {
//   if (Object.prototype.toString.call(params) === '[object Object]') throw new TypeError('params should be an object')
//   return pg.compile(regex)(params)
// }

const instance = axios.create({
  timeout: 5000,
  baseURL: base_URl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

//携带token
instance.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
})

//判断error设置拦截器
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    message.error('您未经授权，请重新登录');
    this.props.history.push({
      pathname: '/login'
    })
  }
})
/**
 * @description 用户登录
 * @param {Object} userinfo 用戶信息
 * @returns {Promise}
 */
export const userLogin = function (userinfo) {
  return instance.request({
    method: 'POST',
    url: '/v1/account/login',
    data: qs.stringify(userinfo)
  })
}

/**
  * @description 用户注册
  * @param { Object } userinfo 用戶信息
  * @returns { Promise }
 */
export const userRegiste = function (userinfo) {
  return instance.request({
    method: 'POST',
    url: '/v1/account/register',
    data: qs.stringify(userinfo) // json
  })
}




