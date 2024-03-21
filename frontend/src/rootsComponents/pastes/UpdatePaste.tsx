import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content cannot be empty",
  }),
  title: z.string(),
  password: z.string(),
});

type UpdatePasteProps = {
  id: number;
  title: string;
  content: string;
  password: string;
};

export const UpdatePaste: React.FC<UpdatePasteProps> = ({
  id,
  content,
  title,
  password,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content,
      title,
      password,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const apiUrl = `http://localhost:4000/pastes/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2 className="mb-1">Your paste</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Content"
                    className="min-h-[240px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Update Paste</Button>
        </form>
      </Form>
    </>
  );
};
