import { FC } from "react";
import MainTable from "../MainTable";
import type { FilterFn } from "@tanstack/react-table";
import getQuizAnswerColumns from "./quizParticipantColumn";
import { QuizData } from "@/types/quiz";

interface QuizParticipantTableProps {
  data: QuizData["participants"];
  reFetch: () => void;
  isFetching: boolean;
}

const QuizParticipantTable: FC<QuizParticipantTableProps> = ({
  data,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<QuizData["participants"][number]> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const user = row.original.user;

    return user.fullName.toLowerCase().includes(filterValue);
  };

  console.log(data);

  return (
    <MainTable
      data={data}
      notFoundText="No user found"
      columns={getQuizAnswerColumns()}
      placeholder="Search user"
      globalFilterFn={globalFilterFn}
      reFetch={reFetch}
      isFetching={isFetching}
    />
  );
};

export default QuizParticipantTable;
