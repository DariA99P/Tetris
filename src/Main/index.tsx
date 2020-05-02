import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FormAuthComponent } from "./components/Auth";
import Layout from "antd/lib/layout";
import { TetrisPage } from "./components/PlayPage";

const { Content } = Layout;

export const MainComponent: React.FC = () => (
    <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Layout style={{ background: 'white' }}>
                <Content>
                    <Switch>
                        <Route exact path="/tetris" component={TetrisPage} />
                        <Route exact path="/" component={FormAuthComponent} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    </Router>
);