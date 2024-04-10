import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "@/types/User";

const formSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  oldPassword: z.string().optional(),
});

export const UpdateAccount = ({ user }: { user: User }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      password: "",
      oldPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const requestBody = {
      ...(values.email && { email: values.email }),
      ...(values.password && { new_password: values.password }),
      ...(values.oldPassword && { old_password: values.oldPassword }),
    };

    const res = await fetch(`http://localhost:3000/auth/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (res.ok) {
      setError(null);

      setIsSuccess(true);
      return;
    }

    const err = await res.text();
    setError(err);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid space-y-3 md:max-w-xl">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues().password && (
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">Update Account</Button>
            {error && (
              <div className="p-3 text-center text-red-500 rounded-md">
                {error}
              </div>
            )}
            {isSuccess && (
              <div className="p-3 text-center text-green-500 rounded-md">
                Account updated successfully
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
