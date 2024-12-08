"use server";

import { prisma } from "@/prisma/prisma";

interface Room {
  room: {
    name: string;
    roomId: string;
  };
}

interface GameState {
  roomId: string;
  gameState: string;
}

export async function joinRoom({ room }: Room) {
  const exisingRoom = await prisma.room.findUnique({
    where: {
      roomId: room.roomId,
    },
  });

  if (exisingRoom) {
    const playerExistsInRoom = await prisma.room.findUnique({
      where: {
        roomId: room.roomId,
        OR: [
          {
            player1: room.name,
          },
          {
            player2: room.name,
          },
        ],
      },
    });

    if (playerExistsInRoom) {
      return { data: null, message: "Joined Room Successfully", status: true };
    } else {
      const bothPlayersExist = await prisma.room.findUnique({
        where: {
          roomId: room.roomId,
          NOT: {
            player2: null,
          },
        },
      });

      if (!bothPlayersExist) {
        await prisma.room.update({
          data: {
            player2: room.name,
          },
          where: {
            roomId: room.roomId,
          },
        });

        return { data: null, message: "Joined Room Successfully", status: true };
      }

      return { data: null, message: "Room is Full", status: false };
    }
  } else {
    await prisma.room.create({
      data: {
        player1: room.name,
        roomId: room.roomId,
      },
    });

    return { data: null, message: "Created Room Successfully", status: true };
  }
}

export async function setGameState({ gameState, roomId }: GameState) {
  await prisma.room.update({
    data: {
      gameState,
    },
    where: {
      roomId,
    },
  });

  return { data: null, message: "Game Room State Saved Successfully", status: true };
}

export async function getGameState(roomId: string) {
  const room = await prisma.room.findUnique({
    where: {
      roomId,
    },
  });

  return { data: room?.gameState, message: "Success", status: true };
}

export async function getPlayer({ room }: Room) {
  const player1 = await prisma.room.findUnique({
    where: {
      roomId: room.roomId,
      player1: room.name,
    },
  });

  const player2 = await prisma.room.findUnique({
    where: {
      roomId: room.roomId,
      player2: room.name,
    },
  });

  if (player1) {
    return {
      data: { playerNumber: 1, name: player1.player1 || "Player 1", other: player1.player2 || "Player 2" },
      status: true,
      message: "You are Player 1",
    };
  } else {
    return {
      data: { playerNumber: 2, name: player2?.player2 || "Player 2", other: player2?.player1 || "Player 1" },
      status: true,
      message: "You are Player 2",
    };
  }
}
