"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signInSchema } from "../_schemas/sign-in-shema";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (response?.error) {
      setError("Неверное имя или пароль.");
    } else {
      router.push("/");
    }

    setIsLoading(false);

    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Войти</DialogTitle>
          <DialogDescription>
            Введите имя и пароль для входа в систему.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
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
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isLoading}
                        type={isVisible ? "text" : "password"}
                        className="pr-9"
                        {...field}
                      />
                      <Button
                        disabled={isLoading}
                        onClick={() => setIsVisible(!isVisible)}
                        type="button"
                        variant="link"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                      >
                        {isVisible ? <Eye /> : <EyeOff />}
                        <span className="sr-only">
                          {isVisible ? "Скрыть пароль" : "Показать пароль"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {error}
              </p>
            )}
            <div className="flex justify-end">
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
