import React from 'react';
import {Button, Card} from 'react-bootstrap';
import './pokemon-quiz-start.scss';


type IProps = {
    handleStartQuiz: () => void
}

type IState = {}

export class PokemonQuizStart extends React.Component<IProps, IState> {
    render() {
        return (
            <div className="pokemon-quiz-start ">
                <img
                    src="/quiz-image.jpeg"
                />
                <Button className="pokemon-quiz-start-button" variant="success" onClick={this.props.handleStartQuiz}>Start Quiz</Button>{' '}
            </div>
        )
    }
}