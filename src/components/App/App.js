import React from 'react';

import Header from '../Header';
import RandomPlanet from '../Random-planet';
import ErrorBoundry from "../Error-boundry";
import SwapiService from "../../service/swapi-service";
import DummySwapiService from "../../service/dummy-swapi-service";

import { PeoplePage,
         PlanetPage,
         StarshipPage,
         SecretPage,
         LoginPage } from "../Pages";

import {SwapiServiceProvider} from "../swapi-service-context";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import './App.css';
import { StarshipDetails } from '../SW-components';



export default class App extends React.Component {

 

  state = {
    swapiService : new SwapiService(),
    isLoggedIn : false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn : true
    })
  }

  onServiceChange = () =>{
    this.setState(({swapiService})=>{
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService
      console.log(" onService Change",Service.name)
          return {
               swapiService : new Service()
           }
    });
  };


  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />
                <Switch>
                  <Route path="/"
                         render={() => <h2>Welcome to Star DB</h2>}
                         exact/>
                  <Route path="/people/:id?" component={PeoplePage}/>
                  <Route path="/planets" component={PlanetPage}/>
                  <Route path="/starships" component={StarshipPage} exact/>
                  <Route path={"/starships/:id" }
                         render={({ match }) => {
                           const { id } = match.params;
                         return <StarshipDetails itemId={id}/>
                         }}/>
                  <Route path="/login" render={() => (
                                 <LoginPage
                                  isLoggedIn={isLoggedIn}
                                  onLogin={this.onLogin}/>
                         )}/>
                  <Route path="/secret" render={() => (
                          <SecretPage isLoggedIn={isLoggedIn}/>
                  )}/>
                  <Route render={() => <h1 style={{textAlign:"center", color:"tomato"}}>You  will write a wrong URL!!</h1>}/>
                </Switch> 
            </div>
          </Router>
       
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

