/**
 * @description 生成统计列表
 * @author alei
 */
const Mock = require('mockjs')
const Random = Mock.Random

const getComponentList = require('./getComponentList')

const getStatList = (len = 10) => {
  let data = []
  let componentList = getComponentList()
  for (let i = 0; i < len; i++) {
    let stat = {
      _id: Random.id()
    }
    // 增加各个组件的value 以 key(组件id) :value(填写内容)
    componentList.forEach(item => {
      const { fe_id, type, props } = item
      // 根据组件类型 获取不同title
      switch (type) {
        case 'questionInput': {
          stat[fe_id] = Random.ctitle()
          break;
        }
        case 'questionTextArea': {
          stat[fe_id] = Random.ctitle()
          break;
        }
        //Random.integer(0, props.options.length - 1) 随机一个下标值被选中
        case "questionRadio": {
          stat[fe_id] = props.options[Random.integer(0, props.options.length - 1)].label
          break;
        }
        case 'questionCheckbox': {
          stat[fe_id] = props.lists[Random.integer(0, props.lists.length - 1)].label
          break;
        }
      }
    })
    data.push(stat)
  }
  return data
}

module.exports = getStatList