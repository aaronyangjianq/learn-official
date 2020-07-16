import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}

export function checkLogin() {
  return request({
    url: '/login/check',
    method: 'get'
  })
}

export function getPendingReviewData(page, limit, status) {
  return request({
    url: 'demand/index',
    method: 'post',
    data: {
      page,
      limit,
      status
    }
  })
}

export function getPendingReviewDataDetail(id) {
  return request({
    url: `demand/info`,
    method: 'post',
    data: {
      id
    }
  })
}

export function getReviewData(page, limit, dev_type) {
  return request({
    url: '/demand/demand',
    method: 'post',
    data: {
      dev_type,
      page,
      limit
    }
  })
}

export function upStatus(ids, status) {
  return request({
    url: '/demand/upStatus',
    method: 'post',
    data: {
      ids,
      status
    }
  })
}

export function deleteData(ids) {
  return request({
    url: '/demand/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function getTypes() {
  return request({
    url: '/public/getTypes',
    method: 'get'
  })
}
