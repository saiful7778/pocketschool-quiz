import { getRouteApi } from "@tanstack/react-router";
import { FC } from "react";

const routeData = getRouteApi("/private/classroom/$classroomId/quiz/$quizId");

const SingleQuiz: FC = () => {
  const { classroomId, quizId } = routeData.useParams();
  console.log({ classroomId, quizId });
  return <div>SingleQuiz</div>;
};

export default SingleQuiz;
