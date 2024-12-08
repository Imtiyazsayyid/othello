"use client";

import { useEffect, useRef, useState } from "react";
import Block from "../../Block";
import Othello from "../../Othello";
import { cn } from "@/lib/utils";
import { getGameState, getPlayer, setGameState } from "@/lib/actions/game";

function ps(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

interface Props {
  params: {
    roomId: string;
  };
}

export default function Game({ params }: Props) {
  const othelloRef = useRef(new Othello());
  const othello = othelloRef.current;

  const [currentBoard, setCurrentBoard] = useState<string[][]>(ps(othello.currentBoard));
  const [currentPlayer, setCurrentPlayer] = useState<any>(ps(othello.currentPlayer));
  const [players, setPlayers] = useState({ player1: ps(othello.player1), player2: ps(othello.player2) });
  const [myPlayerDetails, setMyPlayerDetails] = useState<any>();

  const [isGameOver, setGameOver] = useState(othello.isGameOver);
  const [winner, setWinner] = useState<any | undefined>();

  const syncBoard = () => {
    setCurrentBoard(ps(othello.currentBoard));
    setCurrentPlayer(ps(othello.currentPlayer));

    setPlayers({ player1: ps(othello.player1), player2: ps(othello.player2) });
    if (othello.isGameOver) {
      if (othello.player1.score > othello.player2.score) {
        setWinner(ps(othello.player1));
      } else if (othello.player2.score > othello.player1.score) {
        setWinner(ps(othello.player2));
      }
    }
    setGameOver(othello.isGameOver);
  };

  const handleMove = async (r: number, c: number) => {
    console.log({ currentPlayer, myPlayerDetails });

    if (currentPlayer.name !== myPlayerDetails.name) return;
    const moveOccured = othello.makeMove(r, c);
    if (!moveOccured) return;
    syncBoard();

    await setGameState({ roomId: params.roomId, gameState: JSON.stringify(othello.getGameState()) });
  };

  const initializeGame = async (roomDetails: any) => {
    const { data } = await getPlayer({ room: roomDetails });
    setMyPlayerDetails(data);

    if (data.playerNumber == 1) {
      othello.player1.name = data.name;
      othello.player2.name = data.other;
    }

    if (data.playerNumber == 2) {
      othello.player1.name = data.other;
      othello.player2.name = data.name;
      const { data: gameStateString } = await getGameState(roomDetails.roomId);
      if (gameStateString) {
        const gameStateJSON = JSON.parse(gameStateString);
        gameStateJSON.player2.name = data.name;
        await setGameState({ roomId: roomDetails.roomId, gameState: JSON.stringify(othello.getGameState()) });
      }
    }

    const { data: gameState } = await getGameState(roomDetails.roomId);
    if (gameState) {
      othello.setGameState(JSON.parse(gameState));
    } else {
      await setGameState({ roomId: roomDetails.roomId, gameState: JSON.stringify(othello.getGameState()) });
    }

    syncBoard();
    console.log({ gs: othello.getGameState() });
  };

  useEffect(() => {
    const roomDetails = localStorage.getItem(`roomDetails_${params.roomId}`);

    if (roomDetails) {
      initializeGame(JSON.parse(roomDetails));
    }
  }, []);

  const getCurrentGame = async () => {
    const { data: gameState } = await getGameState(params.roomId);
    if (gameState) {
      othello.setGameState(JSON.parse(gameState));
      syncBoard();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentPlayer.name !== myPlayerDetails.name) {
        getCurrentGame();
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentPlayer, myPlayerDetails]);

  return (
    <main className="h-screen flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-col gap-4">
        {/* Player Scores */}

        <div>
          <h1 className="font-bold text-3xl text-center">Room #{params.roomId}</h1>
          {isGameOver && (winner ? <h4>{winner.name} Wins!</h4> : <h4>Draw</h4>)}
        </div>

        <div className="flex justify-between gap-5 items-center">
          <div
            className={cn(
              "flex gap-2 items-center w-fit p-2 pr-5 rounded-full bg-zinc-900",
              players.player1.move === currentPlayer.move && "bg-green-900"
            )}
          >
            <div
              className={cn(
                "h-6 w-6 rounded-full flex justify-center items-center text-xs font-bold",
                players.player1.move === "W" ? "bg-white text-black" : "bg-black text-white"
              )}
            >
              {players.player1.score}
            </div>
            <h4>{players.player1.name}</h4>
          </div>

          <div
            className={cn(
              "flex gap-2 flex-row-reverse items-center w-fit p-2 pl-5 rounded-full bg-zinc-900",
              players.player2.move === currentPlayer.move && "bg-green-900"
            )}
          >
            <div
              className={cn(
                "h-6 w-6 rounded-full flex justify-center items-center text-xs font-bold",
                players.player2.move === "W" ? "bg-white text-black" : "bg-black text-white"
              )}
            >
              {players.player2.score}
            </div>
            <h4>{players.player2.name}</h4>
          </div>
        </div>

        {/* Board */}
        <div className="rounded-xl bg-zinc-900 p-2 flex flex-col gap-2">
          {currentBoard.map((row: string[], r_index) => (
            <div className="flex gap-2" key={r_index}>
              {row.map((cell, c_index) => (
                <div key={`${r_index}${c_index}`}>
                  <Block cell={cell} onClick={() => handleMove(r_index, c_index)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
