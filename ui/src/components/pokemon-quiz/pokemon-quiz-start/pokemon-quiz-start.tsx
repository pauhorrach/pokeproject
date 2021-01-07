import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './pokemon-quiz-start.scss';


type IProps = {
    handleStartQuiz: () => void
}

type IState = {

}

export class PokemonQuizStart extends React.Component<IProps, IState> {
    render() {
        return (
            <Card className="pokemon-quiz-start-card" >
                <Card.Body>
                <Button variant="success" onClick={this.props.handleStartQuiz}>Start Quiz</Button>{' '}
                </Card.Body>
            </Card>
        )
    }
}