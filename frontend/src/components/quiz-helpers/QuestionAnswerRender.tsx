import { FC } from "react";
import useQuiz from "@/hooks/useQuiz";
import QuestionAnswerBase from "../quiz-question-helpers/questionAnswer/QuestionAnswerBase";
import MultipleOptionQuestionAnswer from "../quiz-question-helpers/questionAnswer/MultipleOptionQuestionAnswer";
import MultipleAnswerQuestionAnswer from "../quiz-question-helpers/questionAnswer/MultipleAnswerQuestionAnswer";
import TextAnswerQuestionAnswer from "../quiz-question-helpers/questionAnswer/TextAnswerQuestionAnswer";
import type { Question } from "@/types/question";
import { motion } from "framer-motion";
import ComplateQuiz from "./ComplateQuiz";

const QuestionAnswerRender: FC = () => {
  const { currentQuestion, complateQuiz, questionIdx, questionLimit } =
    useQuiz();

  return complateQuiz ? (
    <>
      <ComplateQuiz />
    </>
  ) : (
    <QuestionAnswerBase
      questionLimit={questionLimit}
      questionNO={questionIdx + 1}
      questionText={currentQuestion?.questionText!}
      timeLimit={currentQuestion?.timeLimit!}
    >
      <QuestionType question={currentQuestion} />
    </QuestionAnswerBase>
  );
};

const QuestionType = ({ question }: { question: Question }) => {
  const animationVariants = {
    hidden: {
      opacity: 0,
    },
    visiable: {
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
      },
    },
  };

  if (question.questionType === "multipleOption") {
    return (
      <motion.div
        className="space-y-6"
        variants={animationVariants}
        initial="hidden"
        animate="visiable"
        layout
      >
        <div className="text-center text-sm italic text-muted-foreground">
          Select single option answer
        </div>
        <MultipleOptionQuestionAnswer
          questionId={question._id}
          options={question?.options!}
          questionType={question.questionType}
        />
      </motion.div>
    );
  }

  if (question.questionType === "multipleAnswer") {
    return (
      <motion.div
        className="space-y-6"
        variants={animationVariants}
        initial="hidden"
        animate="visiable"
        layout
      >
        <div className="text-center text-sm italic text-muted-foreground">
          Select multiple option answer
        </div>
        <MultipleAnswerQuestionAnswer
          questionId={question._id}
          options={question?.options!}
          questionType={question.questionType}
        />
      </motion.div>
    );
  }

  if (question.questionType === "textAnswer") {
    return (
      <motion.div
        className="space-y-6"
        variants={animationVariants}
        initial="hidden"
        animate="visiable"
        layout
      >
        <div className="text-center text-sm italic text-muted-foreground">
          Type text answer
        </div>
        <TextAnswerQuestionAnswer
          questionId={question._id}
          questionType={question.questionType}
        />
      </motion.div>
    );
  }
};

export default QuestionAnswerRender;
