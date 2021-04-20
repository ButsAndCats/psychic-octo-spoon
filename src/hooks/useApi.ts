

import { CasinoGameMines, minesBet, minesCashout, minesNext } from "../api";

export const useApi = () => {

  const postNextMines = async (tileToReveal: number): Promise<CasinoGameMines> => await minesNext(tileToReveal);
  const postMinesBet = async (mineCount: number): Promise<CasinoGameMines> => await minesBet(mineCount);
  const postMinesCashout = async (): Promise<CasinoGameMines> => await minesCashout();

  return {
    postMinesBet,
    postNextMines,
    postMinesCashout,
  }
}
