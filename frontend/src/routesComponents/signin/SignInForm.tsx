import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Content cannot be empty",
  }),
  password: z.string(),
});

export const SignInForm = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const apiUrl = "http://localhost:3000/auth/signin";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { token } = await response.json();
      localStorage.setItem("token", token);

      if (response.ok) setIsSignedIn(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/pastes/new");
  }, []);

  if (isSignedIn) {
    return (
      <div>
        <h2 className="mb-2 text-2xl font-bold text-center">Sign In</h2>
        <p className="mb-3 text-center">You are now signed in!</p>
        <Button
          className="w-full"
          onClick={() => {
            navigate("/pastes/new");
          }}
        >
          Create a new paste
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-center">Sign In</h2>
      <a href="/signup">
        <p className="mb-3 text-sm italic text-center text-gray-300">
          Don't have an account?
        </p>
      </a>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
