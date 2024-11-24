"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Floor } from "../../_types";

import { useFloors } from "../../_hooks/use-floors";

const formSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
});

interface FloorFormProps {
  initialValues: Floor | null;
}

export function FloorForm({ initialValues }: FloorFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {
      label: "",
    },
  });

  const { updateFloor, addFloor } = useFloors();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      if (initialValues) {
        await updateFloor(initialValues.id, values);
      } else {
        await addFloor(values);
      }

      router.replace("/floors");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    form.reset(initialValues ?? { label: "" });
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.replace("/floors")}
          >
            Отмена
          </Button>
          <Button disabled={isLoading} type="submit">
            {initialValues
              ? isLoading
                ? "Сохранение..."
                : "Сохранить"
              : isLoading
                ? "Создание..."
                : "Создать"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
