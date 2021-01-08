import React from "react";
import './pokemon-quiz-question.scss'
import {Button, Card} from "react-bootstrap";
import {PokemonCard} from "../../pokemon-card/pokemon-card";
import {Timer} from "../../common/timer/timer";
import {QuizQuestionInterface} from "../../../interfaces/quiz.interface";

type IProps = {
    questionInfo: QuizQuestionInterface
    handleAnsweredQuestion: (answer: string, usedHints: number) => void
}

type IState = {
    usedHints: number
    hintRequested: boolean
}

export class PokemonQuizQuestion extends React.Component<IProps, IState> {

    private questionTime: number = 20;

    constructor(props: IProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTimeOver = this.handleTimeOver.bind(this);
        this.onClueRequesting = this.onClueRequesting.bind(this);

        this.state = {
            usedHints: 0,
            hintRequested: false
        }
    }

    handleTimeOver() {
        this.props.handleAnsweredQuestion("", 0);
    }

    handleClick(e: any) {
        this.props.handleAnsweredQuestion(e.target.value, this.state.usedHints);
    }

    onClueRequesting() {
        this.setState((prevState) => ({
                usedHints: prevState.usedHints + 1,
                hintRequested: true
            })
        )
    }

    renderClue() {
        if (this.state.hintRequested) {
            return (
                <span className="ml-30">{this.props.questionInfo.hints[this.state.usedHints - 1].hint}</span>
            )
        }
    }


    render() {
        return (
            <Card className="pokemon-quiz-question-card">
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
                                <Button className="pokemon-quiz-question-card--button" variant="primary"
                                        value={this.props.questionInfo.options[0]}
                                        onClick={(e) => this.handleClick(e)}
                                        block>
                                    {this.props.questionInfo.options[0]}
                                </Button>{' '}
                            </div>
                            <div className="col">
                                <Button className="pokemon-quiz-question-card--button" variant="primary"
                                        value={this.props.questionInfo.options[1]}
                                        onClick={(e) => this.handleClick(e)}
                                        block>
                                    {this.props.questionInfo.options[1]}
                                </Button>{' '}
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col">
                                <Button className="pokemon-quiz-question-card--button" variant="primary"
                                        value={this.props.questionInfo.options[2]}
                                        onClick={(e) => this.handleClick(e)}
                                        block>
                                    {this.props.questionInfo.options[2]}
                                </Button>{' '}
                            </div>
                            <div className="col">
                                <Button className="pokemon-quiz-question-card--button" variant="primary"
                                        value={this.props.questionInfo.options[3]}
                                        onClick={(e) => this.handleClick(e)}
                                        block>
                                    {this.props.questionInfo.options[3]}
                                </Button>{' '}
                            </div>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted pokemon-quiz-question-card--footer">
                    <Button className="ml-15" variant="outline-primary" onClick={this.onClueRequesting} disabled={this.state.usedHints === this.props.questionInfo.hints.length}>{this.state.hintRequested ? "Another clue" : "Clue"}</Button>{' '}
                    {this.renderClue()}
                </Card.Footer>
            </Card>
        )
    }
}