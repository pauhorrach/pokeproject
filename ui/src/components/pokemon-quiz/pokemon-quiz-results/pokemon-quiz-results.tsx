import React from 'react';
import {Button, Card} from 'react-bootstrap';
import './pokemon-quiz-results.scss';


type IProps = {
    score: number
    handleStartOverQuiz: () => void
}

type IState = {}

export class PokemonQuizResults extends React.Component<IProps, IState> {
    render() {
        return (
            <Card className="pokemon-quiz-results-card">
                <Card.Body>
                    <div className="pokemon-quiz-results-score">
                        <div className="pokemon-quiz-results-score--title">
                            SCORE:
                        </div>
                        <div className="pokemon-quiz-results-score--number">
                            {this.props.score} / 100
                        </div>
                    </div>
                    <Button variant="success" onClick={this.props.handleStartOverQuiz} size="lg">Play again</Button>{' '}
                </Card.Body>
            </Card>
        )
    }
}