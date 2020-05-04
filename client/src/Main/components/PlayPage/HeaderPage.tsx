import React from "react";
import * as s from "./styled";
import {TitleStyled} from "../Auth/styled";
import {Tooltip} from "antd";
import { Link } from "react-router-dom";

export const HeaderPage: React.FC = () => (
    <s.HeaderComponentStyled>
        <div />
        <TitleStyled>Tetris</TitleStyled>
        <Tooltip placement="leftTop" title="Home Page">
            <Link to={{ pathname: '/' }}>
                <s.HomeFilledStyled />
            </Link>
        </Tooltip>
    </s.HeaderComponentStyled>
);