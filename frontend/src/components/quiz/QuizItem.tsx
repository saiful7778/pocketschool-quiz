import { FC, ReactNode } from "react";
import Button from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import quizImageTemplate from "@/assets/images/quiz-template.jpg";
import type { QuizzesRes } from "@/types/quiz";
import { Link, type UseNavigateResult } from "@tanstack/react-router";

interface QuizMainItemProp extends QuizzesRes {
  children: ReactNode;
}

const QuizMainItem: FC<QuizMainItemProp> = ({
  title,
  newQuiz,
  questionsCount,
  children,
}) => {
  const titleLimit = 20;
  const imageText = {
    fontSize:
      (90 / (title.length > titleLimit ? titleLimit : title.length)) * 3,
    text:
      title.length > titleLimit ? title.slice(0, titleLimit) + "..." : title,
  };

  return (
    <div className="flex w-[255px] flex-col justify-between gap-2 rounded-md border p-4 shadow">
      <div>
        <div className="relative overflow-hidden rounded-md border">
          <img src={quizImageTemplate} alt="quiz image template" />
          <div className="absolute inset-0 left-1/2 top-1/2 z-[1] h-fit w-[100px] -translate-x-1/2 -translate-y-1/2 text-center">
            <span
              className="select-none font-bold italic leading-none"
              style={{
                fontSize: imageText.fontSize,
              }}
            >
              {imageText.text}
            </span>
          </div>
          {newQuiz && (
            <span className="absolute right-2 top-2 select-none rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground shadow-md">
              New
            </span>
          )}
        </div>
        <h4 className="my-2 text-lg font-semibold leading-none">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div>Total questions:</div>
          <div className="ml-auto">{questionsCount}</div>
          <div>
            <MessageCircleCode
              className="stroke-muted-foreground"
              strokeWidth={1}
              size={16}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
};

interface QuizItemProp extends QuizzesRes {
  classroomId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}

export const QuizItem: FC<QuizItemProp> = ({
  title,
  _id,
  newQuiz,
  questionsCount,
  navigate,
  classroomId,
}) => {
  return (
    <QuizMainItem
      title={title}
      _id={_id}
      newQuiz={newQuiz}
      questionsCount={questionsCount}
    >
      <Button
        className="w-full"
        variant="outline"
        onClick={() =>
          navigate({
            to: "/classroom/$classroomId/quiz/$quizId",
            params: { classroomId, quizId: _id },
          })
        }
      >
        Show result
      </Button>
    </QuizMainItem>
  );
};

interface NewQuizItemProp extends QuizzesRes {
  classroomId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}

export const NewQuizItem: FC<NewQuizItemProp> = ({
  title,
  _id,
  newQuiz,
  questionsCount,
  classroomId,
  navigate,
}) => {
  return (
    <QuizMainItem
      title={title}
      _id={_id}
      newQuiz={newQuiz}
      questionsCount={questionsCount}
    >
      <Button
        className="w-full"
        onClick={() =>
          navigate({
            to: "/classroom/$classroomId/quiz/$quizId",
            params: { classroomId, quizId: _id },
          })
        }
      >
        Participate
      </Button>
    </QuizMainItem>
  );
};

export const QuizCreateItem = ({ classroomId }: { classroomId: string }) => {
  return (
    <div className="flex w-[255px] flex-col items-center justify-center gap-4 rounded-md border p-4 shadow">
      <MessageCircleCode
        className="stroke-muted-foreground"
        strokeWidth={0.4}
        size={100}
      />
      <span className="text-xs italic text-muted-foreground">
        Click to create new quiz
      </span>
      <Button variant="outline" asChild>
        <Link to="/classroom/$classroomId/create_quiz" params={{ classroomId }}>
          Create new quiz
        </Link>
      </Button>
    </div>
  );
};
