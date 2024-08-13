/**
 * @description 生成组件列表
 * @author alei
 */

const Mock = require('mockjs')
const Random = Mock.Random


const getComponentList = () => {
  return [
    // Info
    {
      fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
      type: 'questionInfo', // 组件类型，不能重复，前后端统一好
      title: '问卷信息',
      isHidden: false,
      isLocked: false,
      props: { title: '问卷标题', desc: '问卷描述...123' }
    },
    // Title
    {
      fe_id: 'c2',
      type: 'questionTitle', // 组件类型，不能重复，前后端统一好
      title: '标题',
      isHidden: false,
      isLocked: false,
      props: { text: '个人信息调研', level: 1, isCenter: false }
    },
    // Input
    {
      fe_id: 'c3',
      type: 'questionInput',
      title: '输入框1',
      isHidden: false,
      isLocked: false,
      props: { title: '你的姓名', placeholder: '请输入姓名...' }
    },
    // Input
    {
      fe_id: 'c4',
      type: 'questionInput',
      title: '输入框2',
      isHidden: false,
      isLocked: false,
      props: { title: '你的电话', placeholder: '请输入电话...' }
    },
    // Textarea
    {
      fe_id: 'c5',
      type: 'questionTextArea',
      title: '多行输入',
      isHidden: false,
      isLocked: false,
      props: { title: '你的爱好', placeholder: '请输入...' }
    },
    // Paragraph
    {
      fe_id: 'c6',
      type: 'questionParagraph',
      title: '段落',
      isHidden: false,
      isLocked: false,
      props: { text: '一行段落1\n一行段落2', isCenter: false }
    },
    // Radio
    {
      fe_id: 'c7',
      type: 'questionRadio',
      title: '单选',
      isHidden: false,
      isLocked: false,
      props: {
        title: '方向',
        isVertical: false,
        options: [
          { value: 'item1', label: '前端' },
          { value: 'item2', label: '后端' },
          { value: 'item3', label: '运维' },
          { value: 'item4', label: '测试' },
        ],
        value: '',
      }
    },
    // Checkbox
    {
      fe_id: 'c8',
      type: 'questionCheckbox',
      title: '多选',
      isHidden: false,
      isLocked: false,
      props: {
        title: '掌握框架',
        isVertical: false,
        lists: [
          { value: "item1", label: "vue", checked: true },
          { value: "item2", label: "react", checked: true },
          { value: "item3", label: "angular", checked: false },
        ],
      }
    }
  ]
}

module.exports = getComponentList