import ClassroomUpdateForm from "@/components/forms/classroom/ClassroomUpdateForm";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import UndefinedData from "@/components/shared/UndefinedData";
import useClassroomDetails from "@/hooks/useClassroomDetails";

interface ClassroomUpdateProps {
  classroomId: string;
}

const ClassroomUpdate: React.FC<ClassroomUpdateProps> = ({ classroomId }) => {
  const {
    data: classroom,
    isLoading,
    isError,
    error,
    refetch,
  } = useClassroomDetails(classroomId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  if (!classroom) {
    return <UndefinedData />;
  }

  console.log(classroom);

  return (
    <ClassroomUpdateForm title={classroom?.title!} classroomId={classroomId} />
  );
};

export default ClassroomUpdate;
