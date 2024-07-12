import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { createClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClassroomCreateFormProps {
  handleSubmit: (e: z.infer<typeof createClassroomSchema>) => void;
  isPending: boolean;
}

const ClassroomCreateForm: React.FC<ClassroomCreateFormProps> = ({
  handleSubmit,
  isPending,
}) => {
  const form = useForm<z.infer<typeof createClassroomSchema>>({
    resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <InputField
              type="text"
              label="Title"
              placeholder="Classroom title"
              disabled={isPending}
              {...field}
            />
          )}
        />
        <Dialog.footer className="gap-2">
          <Dialog.close asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Dialog.close>
          <Button type="submit">
            {isPending ? <Spinner size={20} /> : "Create new classroom"}
          </Button>
        </Dialog.footer>
      </form>
    </Form>
  );
};

export default ClassroomCreateForm;
