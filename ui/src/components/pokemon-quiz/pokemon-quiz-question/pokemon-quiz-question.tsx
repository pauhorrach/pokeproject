import React from "react";
import './pokemon-quiz-question.scss'
import { Button, Card } from "react-bootstrap";
import { PokemonCard } from "../../pokemon-card/pokemon-card";
import { Timer } from "../../common/timer/timer";
import { QuizQuestionInterface } from "../../../interfaces/quiz.interface";

type IProps = {
    questionInfo: QuizQuestionInterface
    handleAnsweredQuestion: (answer: string) => void
}

export class PokemonQuizQuestion extends React.Component<IProps, {}> {

    private questionTime: number = 10;

    constructor(props: IProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTimeOver = this.handleTimeOver.bind(this);
    }

    handleTimeOver() {
        console.log("Time over");
        this.props.handleAnsweredQuestion("");
    }

    handleClick(e: any) {
        this.props.handleAnsweredQuestion(e.target.value);
    }

    render() {
        return (
            <Card className="pokemon-quiz-question-card" >
                <Card.Header>
                    <div className="pokemon-quiz-question-card--header">
                        <div className="pokemon-quiz-question-card--pokemon">
                            <PokemonCard pokemon={this.props.questionInfo.question} minimized={true}></PokemonCard>
                        </div>
                        <div className="pokemon-quiz-question-card--title">
                            <Card.Title>Who's that Pokémon?</Card.Title>
                            <Timer time={this.questionTime} onTimeOver={this.handleTimeOver}></Timer>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="container">
                        <div className="form-row">
                            <div className="col">
                                <Button variant="primary"
                                    value={this.props.questionInfo.options[0]}
                                    onClick={(e) => this.handleClick(e)}
                                    block>
                                    {this.props.questionInfo.options[0]}
                                </Button>{' '}
                            </div>
                            <div className="col">
                                <Button variant="primary"
                                    value={this.props.questionInfo.options[1]}
                                    onClick={(e) => this.handleClick(e)}
                                    block>
                                    {this.props.questionInfo.options[1]}
                                </Button>{' '}
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col">
                                <Button variant="primary"
                                    value={this.props.questionInfo.options[2]}
                                    onClick={(e) => this.handleClick(e)}
                                    block>
                                    {this.props.questionInfo.options[2]}
                                </Button>{' '}
                            </div>
                            <div className="col">
                                <Button variant="primary"
                                    value={this.props.questionInfo.options[3]}
                                    onClick={(e) => this.handleClick(e)}
                                    block>
                                    {this.props.questionInfo.options[3]}
                                </Button>{' '}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}