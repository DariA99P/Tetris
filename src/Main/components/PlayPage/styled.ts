import styled from 'styled-components';
import { HomeFilled } from '@ant-design/icons';
import {Button} from "antd";

export const TetrisPageStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const HeaderComponentStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const HomeFilledStyled = styled(HomeFilled)`
  font-size: 24px;
  cursor: pointer;
`;

export const MainComponentStyled = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const DivComponentStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
`;

export const PlayButtonStyled = styled(Button)`
  width: 200px;
  margin-top: 16px;
`;