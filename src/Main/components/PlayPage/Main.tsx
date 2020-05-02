import React from "react";
import {
    DivComponentStyled,
    MainComponentStyled,
    PlayButtonStyled,
} from "./styled";
import {CanvasComponentStyled} from "../figures/rectangle";
import {TextStyled} from "../Auth/styled";

export const MainComponent: React.FC = () => {
  const [play, setPlay] = React.useState(false);
  return (
      <MainComponentStyled>
          <DivComponentStyled>
              <TextStyled>{`Игрок: ${localStorage.getItem('userName') || ''}`}</TextStyled>
              <PlayButtonStyled id='start' type="primary">
                  Начать игру
              </PlayButtonStyled>
              <TextStyled>Следующая фигура</TextStyled>
              <canvas id='nextFigureId' width='200' height='200' style={{border: '2px solid', marginTop: '8px'}}/>
              <div style={{ marginTop: '16px' }} id='resultId'/>
          </DivComponentStyled>
          <DivComponentStyled>
              <CanvasComponentStyled play={play}/>
          </DivComponentStyled>
      </MainComponentStyled>
  );
};