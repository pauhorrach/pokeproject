import React from "react";
import { Route, Switch } from "react-router-dom";
import { PokemonQuiz } from "../pokemon-quiz/pokemon-quiz";
import { PokemonSearcher } from "../pokemon-searcher/pokemon-searcher";

export class MainRouter extends React.Component<{}, {}> {

    render() {
        return (
            <Switch>
                <Route path="/searcher" component={PokemonSearcher} exact />
                <Route path="/quiz" component={PokemonQuiz} />
            </Switch>
        )
    }
}