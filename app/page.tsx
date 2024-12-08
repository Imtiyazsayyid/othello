"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinRoom } from "@/lib/actions/game";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const JoinOrCreatePage = () => {
  const [room, setRoom] = useState({
    name: "",
    roomId: "",
  });
  const router = useRouter();

  const handleJoinRoom = async () => {
    if (!room.name || !room.roomId) return;

    const { status } = await joinRoom({ room });
    if (status) {
      localStorage.setItem(`roomDetails_${room.roomId}`, JSON.stringify(room));
      router.push("/room/" + room.roomId);
    }
  };

  return (
    <div className="p-5 flex h-screen justify-center items-center">
      <div>
        {/* <h1 className="text-center font-bold text-2xl mb-5">Othello</h1> */}
        <div className="flex flex-col gap-2">
          <Input
            className="w-96"
            placeholder="Name"
            value={room.name}
            onChange={(e) => setRoom({ ...room, name: e.target.value })}
          />
          <Input
            className="w-96"
            placeholder="Room ID"
            value={room.roomId}
            onChange={(e) => setRoom({ ...room, roomId: e.target.value })}
          />
          <Button className="mt-2" onClick={handleJoinRoom}>
            Join
          </Button>
        </div>
        <p className="mt-5 text-center text-xs text-gray-500">Enter ID to create new room or join an existing one.</p>
      </div>
    </div>
  );
};

export default JoinOrCreatePage;
