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
import { Textarea } from "@/components/ui/textarea";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { Image, RealEstate } from "../../_types";

import { useRealEstate } from "../../_hooks/use-real-estate";

import { ImageUploader } from "./image-uploader";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
  description: z.string().trim().nullable(),
  notes: z.string().trim().nullable(),
  price: z
    .string()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
  owner_phone: z.string().trim().nullable(),
  manager_phone: z.string().trim().nullable(),
  realtor_phone: z.string().trim().nullable(),
  balcony_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  condition_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  district_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  floor_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  room_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  storey_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  type_id: z
    .number()
    .min(1, { message: "В этом поле должно быть выбрано значение." }),
  images: z
    .object({ url: z.string() })
    .array()
    .refine((value) => value.some((item) => item), {
      message: "В этом поле должно быть выбрано хотя бы одно значение.",
    }),
});

interface EstateFormProps {
  initialValues:
  | (RealEstate & {
    images: Image[];
  })
  | null;
}

export function EstateForm({ initialValues }: EstateFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {
      name: "",
      description: null,
      notes: null,
      price: "",
      owner_phone: null,
      manager_phone: null,
      realtor_phone: null,
      balcony_id: 0,
      condition_id: 0,
      district_id: 0,
      floor_id: 0,
      room_id: 0,
      storey_id: 0,
      type_id: 0,
      images: [],
    },
  });

  const { updateEstate, addEstate, getParamsData, estateData } = useRealEstate();

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      setIsLoading(true);

      if (initialValues?.id) {
        // await updateEstate(initialValues.id, values);
      } else {
        // await addEstate(values);
      }

      router.replace("/real-estate");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchParamsData = async () => {
      try {
        await getParamsData();
      } catch (error) {
        console.error("Ошибка при загрузке данных параметров:", error);
      }
    };

    fetchParamsData();

    form.reset(
      initialValues ?? {
        name: "",
        description: null,
        notes: null,
        price: "",
        owner_phone: null,
        manager_phone: null,
        realtor_phone: null,
        balcony_id: 0,
        condition_id: 0,
        district_id: 0,
        floor_id: 0,
        room_id: 0,
        storey_id: 0,
        type_id: 0,
        images: [],
      },
    );
  }, [initialValues, form, getParamsData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="name"
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон владельца</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="manager_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон руководителя</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="realtor_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон риелтора</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заметки</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="balcony_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Балкон</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите балкон" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.balconies.map((balcony) => (
                        <SelectItem value={balcony.id.toString()} key={balcony.id}>{balcony.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="condition_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Состояние</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите состояние" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.conditions.map((condition) => (
                        <SelectItem value={condition.id.toString()} key={condition.id}>{condition.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Район</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите район" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.districts.map((district) => (
                        <SelectItem value={district.id.toString()} key={district.id}>{district.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="floor_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Этаж</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите этаж" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.floors.map((floor) => (
                        <SelectItem value={floor.id.toString()} key={floor.id}>{floor.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комнатность</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите комнатность" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.rooms.map((room) => (
                        <SelectItem value={room.id.toString()} key={room.id}>{room.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storey_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Этажность</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите этажность" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.storeys.map((storey) => (
                        <SelectItem value={storey.id.toString()} key={storey.id}>{storey.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип</FormLabel>
                <Select
                  disabled={isLoading}
                  defaultValue={`${field.value}`}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      estateData?.types.map((type) => (
                        <SelectItem value={type.id.toString()} key={type.id}>{type.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Изображения</FormLabel>
              <FormControl>
                <ImageUploader
                  disabled={isLoading}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex items-center justify-end gap-x-2">
          <Button
            disabled={isLoading}
            onClick={() => router.replace("/real-estate")}
            type="button"
            variant="outline"
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
