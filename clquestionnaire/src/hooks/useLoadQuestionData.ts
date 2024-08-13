import react, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";
//api
import { getQuestionService } from "../services/question";

const useLoadQuestionData = () => {
  const { id = "" } = useParams();
  const dispatch = useDispatch();

  const { loading, error, data, run } = useRequest(
    async (id: string) => {
      if (!id) throw Error("无效问卷id");
      return await getQuestionService(id);
    },
    {
      manual: true,
      onSuccess(result) {
        const { title = "", desc = "", js = "", css = "", isPublished = false, componentList = [] } = result;
        //设置有值时默认选中第一个组件 id
        let selectedId = "";
        if (componentList.length > 0) {
          selectedId = componentList[0].fe_id;
        }
        //存储组件列表到 components store中
        dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }));
        //存储页面信息到 pageInfo store中
        dispatch(resetPageInfo({ title, desc, js, css, isPublished }));
      },
    }
  );

  useEffect(() => {
    run(id);
  }, [id]);

  return { error, loading };
};
export default useLoadQuestionData;
