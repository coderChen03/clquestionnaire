/**
 * @description 生成问卷列表
 * @author alei
 */

const Mock = require('mockjs')
const Random = Mock.Random

const getQuestionList = ({ len = 10, isDelete = false, isStar = false }) => {
  let data = []
  for (let i = 0; i < len; i++) {
    data.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(1, 9999),
      createdAt: Random.datetime(),
      isDelete //假删除
    })
  }
  return data
}

module.exports = getQuestionList