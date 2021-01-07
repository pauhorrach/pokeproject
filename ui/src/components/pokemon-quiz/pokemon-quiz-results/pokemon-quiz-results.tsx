import React from 'react';
import { Button, Card } from 'react-bootstrap';
import './pokemon-quiz-results.scss';


type IProps = {
    handleStartOverQuiz: () => void
}

type IState = {

}

export class PokemonQuizResults extends React.Component<IProps, IState> {
    render() {
        return (
            <Card className="pokemon-quiz-start-card" >
                <Card.Body>
                <Button variant="success" onClick={this.props.handleStartOverQuiz}>Play again</Button>{' '}
                </Card.Body>
            </Card>
        )
    }
}