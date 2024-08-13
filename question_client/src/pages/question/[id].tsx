import { FC } from "react";

import PageWrapper from "@/components/PageWrapper";
import { QuestionComponentList } from "@/components/QuestionComponents";
import QuestionInput from "@/components/QuestionComponents/QuestionInput";
import QuestionRadio from "@/components/QuestionComponents/QuestionRadio";

//api
import { getQuestionById } from "@/services/question";

import style from "@/styles/question.module.scss";

type questionType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc: string;
    isPublished: boolean;
    isDeleted: boolean;
    js: string;
    css: string;
    componentList: Array<any>;
  };
  msg?: string;
};
type handleErrorType = {
  title: string;
  desc: string;
  msg: string;
};
//处理显示不同错误
const HandleError: FC<handleErrorType> = ({ title, desc, msg }) => {
  return (
    <PageWrapper title={title} desc={desc}>
      <div style={{ width: "100%", textAlign: "center", color: "red" }}>
        <h3>{title}</h3>
        <p>{msg}</p>
      </div>
    </PageWrapper>
  );
};

const Question: FC<questionType> = ({ errno, data, msg = "" }) => {
  const { id = "", title = "", desc = "", isDeleted, isPublished, componentList = [] } = data || {};
  // 请求错误
  if (errno !== 0) {
    return <HandleError title="错误" desc="错误" msg={msg} />;
  }
  // 问卷已经被删除
  if (isDeleted) {
    return <HandleError title={title} desc={desc} msg="问卷已经被删除" />;
  }
  //问卷尚未发布
  if (!isPublished) {
    return <HandleError title={title} desc={desc} msg="问卷尚未发布" />;
  }
  // 渲染组件
  const genderComponent = (componentList: any) => {
    return componentList.map((c: any) => {
      const { fe_id, type, isHidden, props = {} } = c;
      if (isHidden) return null;
      const Component = QuestionComponentList[type];
      if (!Component) return null;
      return (
        <div key={fe_id} className={style.componentWrapper}>
          <Component fe_id={fe_id} props={props} />
        </div>
      );
    });
  };
  return (
    <PageWrapper title={title} desc="123">
      <form method="post" action="/api/answer">
        {/* 使用隐藏域来提交页面id */}
        <input type="hidden" name="questionId" value={id} />
        {/* 根据配置类型渲染相应的组件 */}
        {genderComponent(componentList)}
        <div className={style.submitBtn}>
          <button type="submit">提交</button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Question;

export async function getServerSideProps(context: any) {
  const { id = "" } = context.params;

  let result = await getQuestionById(id);

  return {
    props: {
      ...result,
    },
  };
}
