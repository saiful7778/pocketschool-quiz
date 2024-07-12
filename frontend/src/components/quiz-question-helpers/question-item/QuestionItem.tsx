import type {
  Answers,
  MultipleOption,
  MultipleOptionAnswer,
  MultipleAnswer,
  MultipleAnswerAnswer,
  TextAnswer,
  TextAnswerAnswer,
} from "@/types";
import QuestionItemBase from "./QuestionItemBase";
import MultipleOptionQuestionItem from "./MultipleOptionQuestionItem";
import MultipleAnswerQuestionItem from "./MultipleAnswerQuestionItem";
import TextAnswerQuestionItem from "./TextAnswerQuestionItem";

interface QuestionItemRenderProps {
  answers: Answers[];
}

const QuestionItem: React.FC<QuestionItemRenderProps> = ({ answers }) => {
  return (
    <div className="space-y-4">
      {answers.map((answer, idx) => (
        <QuestionItemBase
          key={`question-item-${idx}`}
          questionText={answer.question.title}
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
  );
};

const QuestionItemType = ({ answer }: { answer: Answers }) => {
  if (answer.answerType === "multipleOptionAnswer") {
    const question = answer.question as MultipleOption;
    const questionAnswer = answer as MultipleOptionAnswer;

    return (
      <>
        <div className="text-muted-foreground">Options</div>
        {questionAnswer.answerIndex === null && (
          <div className="text-sm italic text-muted-foreground">
            You didn't answer this question.
          </div>
        )}
        <MultipleOptionQuestionItem
          options={question.options}
          correctAnswerIndex={question.correctAnswerIndex}
          answerIndex={questionAnswer.answerIndex}
        />
      </>
    );
  }

  if (answer.answerType === "multipleAnswerAnswer") {
    const question = answer.question as MultipleAnswer;
    const questionAnswer = answer as MultipleAnswerAnswer;

    return (
      <>
        <div className="text-muted-foreground">Options</div>
        {questionAnswer.answerIndices === null && (
          <div className="text-sm italic text-muted-foreground">
            You didn't answer this question.
          </div>
        )}
        <MultipleAnswerQuestionItem
          options={question.options}
          correctAnswerIndices={question.correctAnswerIndices}
          answerIndices={questionAnswer.answerIndices}
        />
      </>
    );
  }

  if (answer.answerType === "textAnswerAnswer") {
    const question = answer.question as TextAnswer;
    const questionAnswer = answer as TextAnswerAnswer;

    return (
      <>
        {questionAnswer.answer === null && (
          <div className="text-sm italic text-muted-foreground">
            You didn't answer this question.
          </div>
        )}
        <TextAnswerQuestionItem
          correctAnswer={question.correctAnswer}
          answer={questionAnswer.answer}
        />
      </>
    );
  }
};

export default QuestionItem;
