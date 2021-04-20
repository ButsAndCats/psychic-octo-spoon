import React from "react";
import _ from "lodash";
import { useGame } from "./useGame";
import { GameButton, Button, ButtonInner, Container, GameGrid, GameWrapper, GameAside, Select, ZoomInWrapper, WobbleWrapper, ShakeWrapper } from "./styledGame";
import { Gem, Mine, LoadingMine } from "../../assets";

const grid = _.range(0, 25);
const options = _.range(1, 24);

const Game = () => {
  const { handleClick, handleBet, handleCashout, setMineCount, loadingTile, status, revealedTiles, mines, mineCount } = useGame();
  return (
    <Container>
      <GameAside>
        {status === "pending" || status === "cashout" || status === "busted" ? (
          <>
            <Select
              value={mineCount}
              onChange={(e) => setMineCount(Number(e.target.value))}
            >
              {options.map((i) => (
                <option value={i} key={i}>{i}</option>
              ))}
            </Select>
            <Button onClick={() => handleBet()}>
              Bet
            </Button>
          </>
        ) : status === "loading" ? (
          <Button disabled>
            <WobbleWrapper>
              <LoadingMine />
            </WobbleWrapper>
          </Button>
        ) : (
          <Button onClick={() => handleCashout()}>
            Cashout
          </Button>
        )}
      </GameAside>
      <GameWrapper>
        <GameGrid>
          {grid.map((i) => {
            const revealed = revealedTiles.includes(i);
            return (
              <GameButton key={i} onClick={() => handleClick(i)} disabled={status !== "ready" || revealed}>
                <ButtonInner loader={loadingTile === i} revealed={revealed} busted={status === "busted" || status === "cashout"}>
                  {mines.includes(i) ? (
                    <ShakeWrapper revealed={revealed}>
                      <Mine width="50%" height="50%" />
                    </ShakeWrapper>
                  ) : revealed || status === "busted" || status === "cashout" ? (
                    <ZoomInWrapper revealed={revealed}>
                      <Gem width="50%" height="50%" />
                    </ZoomInWrapper>
                  ) : null}
                </ButtonInner>
              </GameButton>
            )
          })}
        </GameGrid>
      </GameWrapper>
    </Container>
  );
}

export default Game;
