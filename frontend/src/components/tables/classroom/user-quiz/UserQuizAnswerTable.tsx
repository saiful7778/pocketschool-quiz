import type { AnswerQuizzesRes } from "@/types/quiz";
import type { FilterFn } from "@tanstack/react-table";
import { FC } from "react";
import MainTable from "../../MainTable";
import getQuizAnswerColumns from "./quizAnswerColumn";

interface UserQuizAnswerTableProps {
  data: AnswerQuizzesRes[];
  classroomId: string;
  reFetch: () => void;
}

const UserQuizAnswerTable: FC<UserQuizAnswerTableProps> = ({
  data,
  classroomId,
  reFetch,
}) => {
  const globalFilterFn: FilterFn<AnswerQuizzesRes> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const quizAnswer = row.original as AnswerQuizzesRes;

    return quizAnswer.quiz.title.toLowerCase().includes(filterValue);
  };
  return (
    <MainTable
      data={data}
      notFoundText="No quiz found"
      columns={getQuizAnswerColumns(classroomId)}
      placeholder="Search quiz"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
    />
  );
};

export default UserQuizAnswerTable;
