import type { AnswerQuiz } from "@/types";
import type { FilterFn } from "@tanstack/react-table";
import MainTable from "../MainTable";
import getQuizAnswerColumns from "./quizAnswerColumn";

interface UserQuizAnswerTableProps {
  data: AnswerQuiz[];
  classroomId: string;
  reFetch: () => void;
  isFetching: boolean;
}

const UserQuizzesAnswerTable: React.FC<UserQuizAnswerTableProps> = ({
  data,
  classroomId,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<AnswerQuiz> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const quizAnswer = row.original.quiz as AnswerQuiz["quiz"];

    return quizAnswer.title.toLowerCase().includes(filterValue);
  };

  return (
    <MainTable
      data={data}
      notFoundText="No quiz found"
      columns={getQuizAnswerColumns(classroomId)}
      placeholder="Search quiz"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
      isFetching={isFetching}
    />
  );
};

export default UserQuizzesAnswerTable;
