"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useSession } from "next-auth/react";

import { Container } from "@/components/custom/container";

import { Separator } from "@/components/ui/separator";

import { useRooms } from "../_hooks/use-rooms";

import { AlertModal } from "../_components/alert-modal";

import { RoomForm } from "./_components/room-form";

export default function RoomPage() {
  const { id } = useParams<{ id: string }>();

  const { data: session } = useSession();

  const { room, fetchRoom } = useRooms();

  useEffect(() => {
    const roomId = parseInt(id);

    if (!isNaN(roomId)) {
      fetchRoom(roomId);
    }

    return () => {
      useRooms.setState({ room: null });
    };
  }, [fetchRoom, id]);

  return (
    <section className="py-12">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {room ? "Изменения" : "Создать"}
              </h1>
              <p className="text-xl text-muted-foreground">
                Тут вы можете {room ? "изменить" : "создать"} комнату.
              </p>
            </div>
            {session?.user?.role === "ceo" && room && <AlertModal id={id} />}
          </div>
          <Separator />
        </div>
        <RoomForm initialValues={room} />
      </Container>
    </section>
  );
}
