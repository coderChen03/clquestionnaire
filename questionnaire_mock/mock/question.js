const Mock = require('mockjs')
const getQuestionList = require('./data/getQuestionList.js')
const getComponentList = require('./data/getComponentList.js')

const Random = Mock.Random

module.exports = [{
  //获取单个问卷信息
  url: '/api/question/:id',
  method: 'get',
  response() {
    return {
      errno: 0,
      data: {
        id: Random.id(),
        title: Random.ctitle(),
        desc: Random.paragraph(1, 3),
        isDeleted: false,
        isPublished: true,
        js: '',
        css: '',
        componentList: getComponentList()
      },
    }
  }
},
//创建问卷
{
  url: '/api/question',
  method: 'post',
  response() {
    return {
      errno: 0,
      data: {
        id: Random.id(),
      }
    }
  }
},
//获取（查询）问卷列表
{
  url: '/api/question',
  method: 'get',
  response(ctx) {
    const { url = '', query = {} } = ctx
    // 查看 url中是否标记需要查找要求的 params属性
    let isDelete = url.indexOf('isDelete=true') >= 0
    let isStar = url.indexOf('isStar=true') >= 0
    let pageSize = parseInt(query.pageSize) || 10
    return {
      errno: 0,
      data: {
        list: getQuestionList({ len: pageSize, isStar, isDelete }),
        total: 100
      }
    }
  }
},
//更新问卷
{
  url: '/api/question/:id',
  method: 'patch',
  response() {
    return {
      errno: 0
    }
  }
},
//复制问卷
{
  url: '/api/question/duplicate/:id',
  method: 'post',
  response() {
    return {
      errno: 0,
      data: {
        id: Random.id()
      }
    }
  }
},
//彻底删除问卷
{
  url: '/api/question',
  method: 'delete',
  response() {
    return {
      errno: 0,
    }
  }
}

]