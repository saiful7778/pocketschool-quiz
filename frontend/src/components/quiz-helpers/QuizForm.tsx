import { FC } from "react";
import QuestionsRender from "./QuestionsRender";
import Button from "../ui/button";
import Spinner from "../Spinner";
import { Form, FormField } from "../ui/form";
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
}

const QuizForm: FC<QuizFormProps> = ({
  title,
  submitButtonText,
  defaultValues,
  handleSubmit,
  isPending,
}) => {
  const form = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-full max-w-3xl space-y-4"
      >
        <h2 className="border-b pb-4 text-xl font-semibold">{title}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
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
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <InputField
                className="cursor-pointer"
                type="datetime-local"
                label="Start time"
                disabled={isPending}
                min={field.value}
                {...field}
              />
            )}
          />
        </div>
        <QuestionsRender control={form.control} loading={isPending} />
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};

export default QuizForm;
