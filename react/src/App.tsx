import React from 'react';

import {
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import { Nutritions, NutritionCreate } from "views/nutritions";

function App() {

    return (
        <div className="App">

            <Switch>
                <Route path="/nutrition/create">
                    <NutritionCreate/>
                </Route>

                <Route path="/nutritions" exact>
                    <Nutritions/>
                </Route>

                <Route path="/" exact>
                    <Nutritions/>
                </Route>
            </Switch>

        </div>
     );
}

export default App
