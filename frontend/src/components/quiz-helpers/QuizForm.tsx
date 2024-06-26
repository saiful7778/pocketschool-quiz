import { FC, ReactNode } from "react";
import RenderQuestions from "./RenderQuestions";
import Button from "../ui/button";
import Spinner from "../Spinner";
import Form from "../ui/form";
import InputField from "../InputField";
import { useForm } from "react-hook-form";
import { quizSchema } from "@/lib/schemas/quizSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface QuizFormProps {
  title: string;
  submitButtonText: string;
  isPending: boolean;
  defaultValues: z.infer<typeof quizSchema>;
  handleSubmit: (e: z.infer<typeof quizSchema>) => void;
  status?: ReactNode;
}

const QuizForm: FC<QuizFormProps> = ({
  title,
  submitButtonText,
  defaultValues,
  handleSubmit,
  isPending,
  status,
}) => {
  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-full max-w-2xl space-y-4"
      >
        <h2 className="border-b pb-4 text-xl font-semibold">{title}</h2>
        {status && <div>{status}</div>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.field
            control={form.control}
            name="title"
            render={({ field }) => (
              <InputField
                type="text"
                label="Title"
                placeholder="Quiz title"
                disabled={isPending}
                {...field}
              />
            )}
          />
          <Form.field
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <InputField
                className="cursor-pointer"
                type="datetime-local"
                label="Start time"
                disabled={isPending}
                {...field}
              />
            )}
          />
        </div>
        <RenderQuestions control={form.control} loading={isPending} />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;
