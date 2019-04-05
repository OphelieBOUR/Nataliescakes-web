// src/Routes.jsx

import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Ajout from './pages/Home'
import PageList from './pages/PageListe'

import Icon from 'antd/lib/icon'
import { Button } from 'antd';
import './App.css';


export default function MainRouter () {
    return (
        <Router>

            <div className="menu">
                <div className="banner"><div className="inner-banner"></div></div>

                <div className="subutton-menu">
                    <Link to={"/liste"}>
                        <Button className="nathalie-button" type="primary">
                            <div className="flex">
                                <div className=""><Icon type="ordered-list" /></div>
                                <div className="flex-logo" >Recettes</div>
                            </div>
                            </Button>
                        </Link>&nbsp; &nbsp;


                    <Link to={"/ajout"}>
                        <Button className="nathalie-button" type="primary">
                            <div className="flex">
                            <div className=""><Icon type="plus" /></div>
                            <div className="flex-logo">Ajouter</div>
                            </div>
                            </Button>
                        </Link>&nbsp; &nbsp;
                </div>
                    <Route path="/ajout" component={Ajout}/>
                    <Route path="/liste" component={PageList}/>
                    <Route exact path="/" component={PageList}/>
                    <Route exact path="/edit/:id" component={props => <Ajout {...props}/>}/>


            </div>
        </Router>
    )
}
