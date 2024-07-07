import { FC } from "react";
import Button from "./ui/button";
import { MessageCircleCode } from "lucide-react";
import quizImageTemplate from "@/assets/images/quiz-template.jpg";
import type { NewQuizzesRes } from "@/types/quiz";
import { type UseNavigateResult } from "@tanstack/react-router";

interface QuizItemProp extends NewQuizzesRes {
  classroomId: string;
  navigate: UseNavigateResult<"/classroom/$classroomId/">;
}

const QuizItem: FC<QuizItemProp> = ({
  title,
  totalQuestions,
  navigate,
  classroomId,
  _id,
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
          <span className="absolute right-2 top-2 select-none rounded-full bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground shadow-md">
            New
          </span>
        </div>
        <h4 className="my-2 text-lg font-semibold leading-none">{title}</h4>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div>Total questions:</div>
          <div className="ml-auto">{totalQuestions}</div>
          <div>
            <MessageCircleCode
              className="stroke-muted-foreground"
              strokeWidth={1}
              size={16}
            />
          </div>
        </div>
      </div>
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
    </div>
  );
};
export default QuizItem;
