import { developerSchema } from "@/lib/schemas/developerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import InputField from "../InputField";
import Select from "../ui/select";
import Textarea from "../ui/textarea";
import Button from "../ui/button";
import Spinner from "../Spinner";

interface DeveloperFormProps {
  handleSubmit: (e: z.infer<typeof developerSchema>) => void;
  loading: boolean;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({
  loading,
  handleSubmit,
}) => {
  const form = useForm<z.infer<typeof developerSchema>>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      title: "",
      category: "issue",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <InputField
                  type="text"
                  placeholder="Title"
                  label="Title"
                  disabled={loading}
                  required
                  {...field}
                />
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-36">
                    Category <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <Select.trigger>
                        <Select.value placeholder="Select category" />
                      </Select.trigger>
                    </FormControl>
                    <Select.content>
                      <Select.item value="issue">Issue</Select.item>
                      <Select.item value="bug">Bug</Select.item>
                      <Select.item value="improve">Improve</Select.item>
                      <Select.item value="feature">Feature</Select.item>
                    </Select.content>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Message <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message"
                  className="h-[300px] resize-none overflow-auto"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size={20} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default DeveloperForm;
