const Mock = require('mockjs')
const getStatList = require('./data/getStatList')

const Random = Mock.Random

module.exports = [
  // 获取统计信息
  {
    url: '/api/stat/:questionId',
    method: 'get',
    response(ctx) {
      const { query = {} } = ctx
      let pageSize = parseInt(query.pageSize) || 10
      return {
        errno: 0,
        data: {
          total: 100,
          list: getStatList(pageSize)
        }
      }

    }
  },
  //获取单个组件选项的统计信息
  {
    url: '/api/stat/:questionId/:componentId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          stat: [
            { name: '前端', count: Random.integer(10, 40) },
            { name: '后端', count: Random.integer(20, 50) },
            { name: '运维', count: Random.integer(5, 30) },
            { name: '测试', count: Random.integer(5, 30) },
          ]
        }
      }

    }
  }
]