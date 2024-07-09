import {
  Result,
  Answers,
  MultipleOption,
  MultipleOptionAnswer,
} from "@/types/question";
import { FC } from "react";
import QuestionItemBase from "./QuestionItemBase";
import MultipleOptionQuestionItem from "./MultipleOptionQuestionItem";

interface QuestionItemRenderProps {
  answers: Result["answers"];
}

const QuestionItemRender: FC<QuestionItemRenderProps> = ({ answers }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, idx) => (
          <QuestionItemBase
            key={`question-item-${idx}`}
            questionText={answer.question.questionText}
            timeLimit={answer.question.timeLimit}
            questionMarks={answer.question.mark}
            result={answer.mark}
            isCorrect={answer.isCorrect}
            questionIdx={idx + 1}
          >
            <QuestionItemType answer={answer} />
          </QuestionItemBase>
        ))}
      </div>
    </>
  );
};

const QuestionItemType = ({ answer }: { answer: Answers }) => {
  if (answer.answerType === "multipleOptionAnswer") {
    const question = answer.question as MultipleOption;
    const questionAnswer = answer as MultipleOptionAnswer;

    return (
      <>
        <div className="italic text-muted-foreground">Options</div>
        <MultipleOptionQuestionItem
          options={question.options}
          correctAnswerIndex={question.correctAnswerIndex}
          answerIndex={questionAnswer.answerIndex}
        />
      </>
    );
  }
};

export default QuestionItemRender;
