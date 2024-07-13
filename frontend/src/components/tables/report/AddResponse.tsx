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
import Textarea from "@/components/ui/textarea";
import { useAxiosSecure } from "@/hooks/useAxios";
import { responseSchema } from "@/lib/schemas/reportSchema";
import toast from "@/lib/toast/toast";
import type { ElementOpenProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AddResponseProps extends ElementOpenProps {
  reportId: string;
}

const AddResponse: React.FC<AddResponseProps> = ({
  reportId,
  open,
  onOpenChange,
}) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof responseSchema>>({
    resolver: zodResolver(responseSchema),
    defaultValues: {
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create", "response"],
    mutationFn: async (responseData: z.infer<typeof responseSchema>) => {
      return axiosSecure.post(`/api/report/admin/${reportId}`, responseData);
    },
    onSuccess: (data) => {
      if (data?.status === 201) {
        form.reset({});
        queryClient.invalidateQueries({
          queryKey: ["reports"],
        });
        toast({
          variant: "success",
          title: "Response is added",
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

  const handleSubmit = (e: z.infer<typeof responseSchema>) => {
    mutate(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.content className="w-full max-w-2xl" forceMount>
        <Dialog.header>
          <Dialog.title>Add response</Dialog.title>
        </Dialog.header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
              {isPending ? <Spinner size={20} /> : "Response submit"}
            </Button>
          </form>
        </Form>
      </Dialog.content>
    </Dialog>
  );
};

export default AddResponse;
