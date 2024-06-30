import useQuiz from "@/hooks/useQuiz";
import { FC } from "react";
import QuestionAnswerBase from "./questionAnswer/QuestionAnswerBase";
import MultipleOptionQuestionAnswer from "./questionAnswer/MultipleOptionQuestionAnswer";
import MultipleAnswerQuestionAnswer from "./questionAnswer/MultipleAnswerQuestionAnswer";
import TextAnswerQuestionAnswer from "./questionAnswer/TextAnswerQuestionAnswer";

const QuestionAnswerRender: FC = () => {
  const { currentQuestion, questionIdx } = useQuiz();

  return (
    <QuestionAnswerBase
      questionNO={questionIdx + 1}
      questionText={currentQuestion?.questionText!}
      timeLimit={currentQuestion?.timeLimit!}
    >
      {currentQuestion?.questionType === "multipleOption" && (
        <MultipleOptionQuestionAnswer
          questionId={currentQuestion._id}
          options={currentQuestion?.options!}
        />
      )}
      {currentQuestion.questionType === "multipleAnswer" && (
        <MultipleAnswerQuestionAnswer
          questionId={currentQuestion._id}
          options={currentQuestion?.options!}
        />
      )}
      {currentQuestion.questionType === "textAnswer" && (
        <TextAnswerQuestionAnswer questionId={currentQuestion._id} />
      )}
    </QuestionAnswerBase>
  );
};

export default QuestionAnswerRender;
