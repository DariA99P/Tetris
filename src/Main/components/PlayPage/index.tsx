import React from "react";
import * as s from './styled';
import { HeaderPage } from "./HeaderPage";
import { MainComponent } from "./Main";

export const TetrisPage: React.FC = () => (
    <s.TetrisPageStyled>
       <HeaderPage />
       <MainComponent />
    </s.TetrisPageStyled>
);