import { useAxiosSecure } from "@/hooks/useAxios";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import { getRouteApi } from "@tanstack/react-router";
import useQuiz from "@/hooks/useQuiz";
import Button from "../ui/button";
import { SubmitResult } from "@/types/quiz";

const routeData = getRouteApi("/private/classroom/$classroomId/quiz/$quizId");

const ComplateQuiz: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error["message"]>("");
  const [apiResData, setApiResData] = useState<SubmitResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_submitData, setSubmitData] = useState<boolean>(false);

  const { answers, allQuestions, reFetchData, questionLimit } = useQuiz();
  const { quizId, classroomId } = routeData.useParams();
  const axiosSecure = useAxiosSecure();

  const allQuestionMarks = useMemo(() => {
    return allQuestions.reduce((sum, curr) => sum + curr.mark, 0);
  }, [allQuestions]);

  const allAnswers = useMemo(() => {
    return allQuestions.map((question) => {
      const answer = answers.find((answer) => question._id === answer._id);
      if (!answer) {
        return {
          _id: question._id,
          answer: null,
          questionType: question.questionType,
        };
      } else {
        return answer;
      }
    });
  }, [allQuestions, answers]);

  const submitResult = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setError("");
    try {
      const { data } = await axiosSecure.post(
        `/api/quizzes/user/${quizId}`,
        { answers: allAnswers },
        { params: { classroomId } },
      );

      if (!data.success) {
        throw new Error("Quiz not submitted");
      }

      setApiResData(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setIsError(true);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [allAnswers, axiosSecure, classroomId, quizId]);

  useEffect(() => {
    setSubmitData((prev) => {
      if (!prev) {
        submitResult();
        return true;
      } else {
        return true;
      }
    });
  }, [submitResult]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <>
        <div className="space-y-2 text-center">
          <h3 className="text-3xl font-bold">
            Something <span className="text-destructive">went</span> wrong
            <span className="text-destructive">!</span>
          </h3>
          <pre>
            <code>{error}</code>
          </pre>
        </div>
      </>
    );
  }
  const result = (
    (100 / questionLimit) *
    apiResData?.successAnswers?.length!
  ).toFixed(0);

  return (
    <>
      <div className="flex size-32 items-center justify-center rounded-full border-8 border-primary text-3xl font-bold">
        <span>{result && result}</span>
        <span>%</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Total question: </span>
          <span>{questionLimit}</span>
        </div>
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Total mark: </span>
          <span>
            {apiResData?.totalMarks} of {allQuestionMarks}
          </span>
        </div>
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Right question: </span>
          <span>{apiResData?.successAnswers?.length}</span>
        </div>
        <div className="rounded-md border border-primary p-4 text-center text-xl font-medium">
          <span>Wrong question: </span>
          <span>{apiResData?.failedAnswers?.length}</span>
        </div>
      </div>
      <Button onClick={reFetchData} variant="secondary" size="lg">
        View answers
      </Button>
    </>
  );
};

export default ComplateQuiz;