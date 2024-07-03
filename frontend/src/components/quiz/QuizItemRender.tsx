import type { QuizzesRes } from "@/types/quiz";
import type { UseNavigateResult } from "@tanstack/react-router";
import { FC, useMemo } from "react";
import { NewQuizItem, QuizCreateItem, QuizItem } from "./QuizItem";
import useStateData from "@/hooks/useStateData";

interface QuizItemRenderProps {
  quizzesdata: QuizzesRes[];
  classroomId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}

const QuizItemRender: FC<QuizItemRenderProps> = ({
  quizzesdata,
  classroomId,
  navigate,
}) => {
  const { classroomRole } = useStateData();

  const [newQuizzes, prevQuizzes] = useMemo(() => {
    const newQuizzesData: QuizzesRes[] = [];
    const prevQuizzesData: QuizzesRes[] = [];

    quizzesdata.forEach((quizData) => {
      if (quizData.newQuiz) {
        newQuizzesData.push(quizData);
      } else {
        prevQuizzesData.push(quizData);
      }
    });

    return [newQuizzesData, prevQuizzesData];
  }, [quizzesdata]);

  return (
    <>
      <h3 className="border-b pb-4 text-xl font-semibold">New quizzes</h3>
      <div className="flex flex-wrap gap-4">
        {newQuizzes.map((quiz, idx) => (
          <NewQuizItem
            key={`new-quiz-${idx}`}
            _id={quiz._id}
            classroomId={classroomId}
            navigate={navigate}
            questionsCount={quiz.questionsCount}
            title={quiz.title}
            newQuiz={quiz.newQuiz}
          />
        ))}
        {classroomRole === "admin" && (
          <QuizCreateItem classroomId={classroomId} />
        )}
      </div>
      <h3 className="border-b pb-4 text-xl font-semibold">All quizzes</h3>
      <div className="flex flex-wrap gap-4">
        {prevQuizzes.map((quiz, idx) => (
          <QuizItem
            key={`new-quiz-${idx}`}
            _id={quiz._id}
            classroomId={classroomId}
            navigate={navigate}
            questionsCount={quiz.questionsCount}
            title={quiz.title}
            newQuiz={quiz.newQuiz}
          />
        ))}
      </div>
    </>
  );
};

export default QuizItemRender;
