/**
 * @description 提交问卷
 */

import type { NextApiRequest, NextApiResponse } from "next";
//api
import { postAnswer } from "@/services/answer";

// 将提交的信息格式化 方法
const genderAnswerInfo = (reqBody: { [key: string]: string }) => {
  let questionId = "";
  let answerList: Array<{ [key: string]: string }> = [];
  Object.keys(reqBody).forEach((key) => {
    if (key === "questionId") {
      questionId = reqBody[key];
      return;
    }
    answerList.push({
      componentId: key,
      value: reqBody[key],
    });
  });
  return {
    questionId,
    answerList,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.status(200).json({ errno: -1, msg: "method error" });
  let reqBody = req.body || {};
  let answerInfo = genderAnswerInfo(reqBody);
  console.log(answerInfo, "answerInfo");

  try {
    //提交到服务端
    let result = await postAnswer(answerInfo);
    // 成功 则跳转到成功页面
    if (result.errno === 0) {
      res.redirect("/success");
    } else {
      //失败 则跳转到失败页面
      res.redirect("/fail");
    }
  } catch (err) {
    res.redirect("/fail");
  }

  res.status(200).json({ errno: 0 });
}
