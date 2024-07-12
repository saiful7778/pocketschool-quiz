import MainTable from "../MainTable";
import type { FilterFn } from "@tanstack/react-table";
import getQuizAnswerColumns from "./quizParticipantColumn";
import type { Participant } from "@/types";

interface QuizParticipantTableProps {
  data: Participant[];
  reFetch: () => void;
  isFetching: boolean;
}

const QuizParticipantTable: React.FC<QuizParticipantTableProps> = ({
  data,
  reFetch,
  isFetching,
}) => {
  const globalFilterFn: FilterFn<Participant> = (
    row,
    _columnId,
    filterValue,
  ) => {
    const user = row.original.user;

    return (
      user.fullName.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue)
    );
  };

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
