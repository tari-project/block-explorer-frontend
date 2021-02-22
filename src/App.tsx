import React, { useEffect } from 'react';
import './App.scss';
import BlockExplorer from './components/BlockExplorer';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { setupWebsockets } from './helpers/api';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SingleBlock from './components/SingleBlock';
import SearchKernel from './components/SearchKernel';

export default function App() {
    useEffect(() => {
        const sockets = setupWebsockets(store);
        return function cleanup() {
            sockets.close();
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <TopBar />
                <div className="App-content">
                    <SideBar />
                    <div className="App-content-mainArea">
                        <Switch>
                            <Route exact path="/" component={BlockExplorer} />
                            <Route path="/block/:id" component={SingleBlock} />
                            <Route path="/kernel/:nonce/:signature" component={SearchKernel} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}
