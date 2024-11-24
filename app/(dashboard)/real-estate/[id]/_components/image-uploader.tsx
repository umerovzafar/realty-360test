"use client";

import Image from "next/image";

import { Trash } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  disabled: boolean;
  value: { url: string }[];
  onChange: (files: File[]) => void;
}

export function ImageUploader({
  disabled,
  value,
  onChange,
}: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleDelete = (index: number) => {};

  return (
    <div className="space-y-2">
      <Input disabled={disabled} type="file" multiple />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {value.map((image, index) => (
          <div key={index} className="relative">
            <Image src={image.url} alt="Image" width={100} height={100} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
            >
              <Trash />
              <span className="sr-only">Удалить</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
