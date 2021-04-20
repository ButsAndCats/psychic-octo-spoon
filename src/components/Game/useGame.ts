import * as React from "react";
import { useApi } from "../../hooks/useApi";
import GemSound from "../../assets/gem.mp3";
import MineSound from "../../assets/mine.mp3";

const gemAudio = new Audio(GemSound);
const mineAudio = new Audio(MineSound);

export const useGame = (): GameProps => {
  const [loadingTile, setLoadingTile] = React.useState<number>(-1);
  const [mineCount, setMineCount] = React.useState<number>(5);
  const [status, setStatus] = React.useState<GameStatus>("pending");
  const [mines, setMines] = React.useState<Array<number>>([]);
  const [revealedTiles, setRevealedTiles] = React.useState<Array<number>>([]);
  const { postNextMines, postMinesCashout, postMinesBet } = useApi();
  
  /**
   * Reset and start the game state
   */
  const handleBet = async () => {
    setStatus("loading");
    setMines([]);
    setRevealedTiles([]);
    await postMinesBet(mineCount);
    setStatus("ready");
  }

  /**
   * Handle clicking on one of the tiles
   */
  const handleClick = async (index: number) => {
    setStatus("loading");
    setLoadingTile(index);
    const res = await postNextMines(index);
    setRevealedTiles(res.revealedTiles);
    /**
     * Mine has been clicked
     */
    if (res.mines.length) {
      setStatus("busted");
      setMines(res.mines);
      mineAudio.play();
      setLoadingTile(-1);
      return
    }
    gemAudio.play();
    setStatus("ready");
    setLoadingTile(-1);
  }

  /**
   * Handle finishing the game
   */
  const handleCashout = async () => {
    setStatus("loading");
    const res = await postMinesCashout();
    setMines(res.mines);
    setStatus("cashout");
  }

  return {
    handleBet,
    handleClick,
    handleCashout,
    setMineCount,
    loadingTile,
    mineCount,
    revealedTiles,
    status,
    mines,
  }
}

export type GameStatus = "pending" | "ready" | "loading" | "busted" | "cashout"

export type GameProps = {
  handleBet: () => Promise<void>
  handleClick: (index: number) => Promise<void>
  handleCashout: () => Promise<void>
  setMineCount: React.Dispatch<React.SetStateAction<number>>
  loadingTile: number
  mineCount: number
  status: GameStatus
  revealedTiles: Array<number>
  mines: Array<number>
}

