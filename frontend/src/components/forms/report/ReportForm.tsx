import InputField from "@/components/InputField";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { useAxiosSecure } from "@/hooks/useAxios";
import { reportSchema } from "@/lib/schemas/reportSchema";
import toast from "@/lib/toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BadgePlus, Bug, CircleDot, TrendingUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ReportForm: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: "",
      category: "issue",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create", "developer", "message"],
    mutationFn: async (reportData: z.infer<typeof reportSchema>) => {
      return axiosSecure.post("/api/report", reportData);
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        form.reset({});
        queryClient.invalidateQueries({
          queryKey: ["reports"],
        });
        toast({
          variant: "success",
          title: "Report is send",
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

  const handleSubmit = (e: z.infer<typeof reportSchema>) => {
    mutate(e);
  };

  return (
    <Dialog>
      <Dialog.trigger asChild>
        <Button type="button" size="md">
          New Report
        </Button>
      </Dialog.trigger>
      <Dialog.content className="w-full max-w-2xl" forceMount>
        <Dialog.header>
          <Dialog.title>Report</Dialog.title>
        </Dialog.header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
                          <Select.item value="issue">
                            <span className="flex items-center gap-2">
                              <CircleDot size={16} strokeWidth={1} />
                              <span>Issue</span>
                            </span>
                          </Select.item>
                          <Select.item value="bug">
                            <span className="flex items-center gap-2">
                              <Bug size={16} strokeWidth={1} />
                              <span>Bug</span>
                            </span>
                          </Select.item>
                          <Select.item value="improve">
                            <span className="flex items-center gap-2">
                              <TrendingUp size={16} strokeWidth={1} />
                              <span>Improve</span>
                            </span>
                          </Select.item>
                          <Select.item value="feature">
                            <span className="flex items-center gap-2">
                              <BadgePlus size={16} strokeWidth={1} />
                              <span>Feature</span>
                            </span>
                          </Select.item>
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
                      className="h-[200px] resize-none overflow-auto"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner size={20} /> : "Report submit"}
            </Button>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default ReportForm;
