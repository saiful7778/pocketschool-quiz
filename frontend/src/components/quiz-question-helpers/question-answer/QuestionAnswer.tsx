import useQuiz from "@/hooks/useQuiz";
import QuestionAnswerBase from "./QuestionAnswerBase";
import MultipleOptionQuestionAnswer from "./MultipleOptionQuestionAnswer";
import MultipleAnswerQuestionAnswer from "./MultipleAnswerQuestionAnswer";
import TextAnswerQuestionAnswer from "./TextAnswerQuestionAnswer";
import type { MultipleAnswer, MultipleOption, QuizData } from "@/types";
import { motion } from "framer-motion";
import ComplateQuiz from "../../quiz-helpers/ComplateQuiz";

const QuestionAnswer: React.FC = () => {
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
      questionText={currentQuestion?.title!}
      timeLimit={currentQuestion?.timeLimit!}
    >
      <QuestionType question={currentQuestion} />
    </QuestionAnswerBase>
  );
};

const QuestionType = ({
  question,
}: {
  question: QuizData["questions"][number];
}) => {
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
    const questionData = question as MultipleOption;

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
          questionId={question._id!}
          options={questionData.options}
          answerType="multipleOptionAnswer"
        />
      </motion.div>
    );
  }

  if (question.questionType === "multipleAnswer") {
    const questionData = question as MultipleAnswer;

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
          questionId={question._id!}
          options={questionData.options!}
          answerType="multipleAnswerAnswer"
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
          questionId={question._id!}
          answerType="textAnswerAnswer"
        />
      </motion.div>
    );
  }

  return <div>Not found</div>;
};

export default QuestionAnswer;
