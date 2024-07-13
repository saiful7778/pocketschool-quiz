import { useMutation } from "@tanstack/react-query";
import { developerSchema } from "@/lib/schemas/developerSchema";
import type { z } from "zod";
import { useAxiosSecure } from "@/hooks/useAxios";
import toast from "@/lib/toast/toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const Developer: React.FC = () => {
  const axiosSecure = useAxiosSecure();

  const form = useForm<z.infer<typeof developerSchema>>({
    resolver: zodResolver(developerSchema),
    defaultValues: {
      title: "",
      category: "issue",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create", "developer", "message"],
    mutationFn: async (devMessage: z.infer<typeof developerSchema>) => {
      return axiosSecure.post("/api/developer", devMessage);
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        form.reset({});
        toast({
          variant: "success",
          title: "Query message send",
          description:
            "Your message was sended. Our developer will consider your query.",
        });
      }
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: message,
      });
    },
  });

  const handleSubmit = (e: z.infer<typeof developerSchema>) => {
    mutate(e);
  };

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
                  disabled={isPending}
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
                    disabled={isPending}
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
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner size={20} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default Developer;
