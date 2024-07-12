import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { joinClassroomSchema } from "@/lib/schemas/classroomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ClassroomJoinFormProps {
  handleSubmit: (e: z.infer<typeof joinClassroomSchema>) => void;
  isPending: boolean;
}

const ClassroomJoinForm: React.FC<ClassroomJoinFormProps> = ({
  handleSubmit,
  isPending,
}) => {
  const form = useForm<z.infer<typeof joinClassroomSchema>>({
    resolver: zodResolver(joinClassroomSchema),
    defaultValues: {
      _id: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="_id"
          render={({ field }) => (
            <InputField
              type="text"
              label="Classroom id"
              placeholder="Classroom id"
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
            {isPending ? <Spinner size={20} /> : "Join classroom"}
          </Button>
        </Dialog.footer>
      </form>
    </Form>
  );
};

export default ClassroomJoinForm;
