import ReportForm from "@/components/forms/report/ReportForm";
import Loading from "@/components/Loading";
import ErrorPage from "@/components/shared/Error";
import ReportTable from "@/components/tables/report/ReportTable";
import { useAxiosSecure } from "@/hooks/useAxios";
import type { ApiResponse, ReportType } from "@/types";
import { useQuery } from "@tanstack/react-query";

const Report: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reports,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const { data } =
        await axiosSecure.get<ApiResponse<ReportType[]>>("/api/report");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} reset={refetch} />;
  }

  return (
    <>
      <ReportForm />
      <ReportTable data={reports!} isFetching={isFetching} reFetch={refetch} />
    </>
  );
};

export default Report;
