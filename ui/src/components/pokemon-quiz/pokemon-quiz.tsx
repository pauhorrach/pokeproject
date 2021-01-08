import {timeStamp} from "console";
import React from "react";
import {Spinner} from "react-bootstrap";
import {QuizInterface, QuizQuestionInterface, QuizResponseInterface} from "../../interfaces/quiz.interface";
import {PokemonCard} from "../pokemon-card/pokemon-card";
import {PokemonQuizQuestion} from "./pokemon-quiz-question/pokemon-quiz-question";
import {PokemonQuizResults} from "./pokemon-quiz-results/pokemon-quiz-results";
import {PokemonQuizStart} from "./pokemon-quiz-start/pokemon-quiz-start";
import './pokemon-quiz.scss'

enum QuizState {
    Start = 0,
    InProgress = 1,
    Finished = 2
}

type IProps = {}

type IState = {
    quiz?: QuizInterface
    currentQuestion: number
    quizState: number
    userResponse: QuizResponseInterface,
    score: number
}

export class PokemonQuiz extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = this.initialState()

        this.handleQuestionAnswered = this.handleQuestionAnswered.bind(this);
        this.handleQuizStart = this.handleQuizStart.bind(this);
        this.handleQuizStartOver = this.handleQuizStartOver.bind(this);
    }


    initialState() {
        return {
            quiz: undefined,
            currentQuestion: 0,
            quizState: QuizState.Start,
            userResponse: {answers: []},
            score: 0
        }
    }

    fetchQuizData() {
        fetch(`http://localhost:9000/api/quiz`)
            .then(response => response.json())
            .then(data => this.setState({
                    quiz: data
                })
            )
    }

    calculateScoreAndChangeQuizState() {
        fetch(`http://localhost:9000/api/quiz`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.userResponse),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.text())
            .then(data => {
                this.setState(() => ({
                    quizState: QuizState.Finished,
                    score: Number(data)
                }))
            })
    }

    handleQuestionAnswered(answer: string, usedHints: number) {

        if (this.state.quiz && this.state.currentQuestion + 1 < this.state.quiz?.questions.length) {
            this.setState((prevState) => ({
                currentQuestion: prevState.currentQuestion + 1,
                userResponse: {
                    answers: prevState.userResponse.answers.concat(
                        [{
                            solution: prevState.quiz && prevState.quiz?.questions[prevState.currentQuestion].answer || "",
                            userAnswer: answer,
                            usedHints: usedHints
                        }])
                }
            }))
        } else {
            this.setState((prevState) => ({
                userResponse: {
                    answers: prevState.userResponse.answers.concat(
                        [{
                            solution: prevState.quiz && prevState.quiz?.questions[prevState.currentQuestion].answer || "",
                            userAnswer: answer,
                            usedHints: usedHints
                        }])
                }
            }), () => this.calculateScoreAndChangeQuizState())
        }
    }

    handleQuizStart() {
        this.fetchQuizData();
        this.setState(() => ({quizState: QuizState.InProgress}))
    }

    handleQuizStartOver() {
        this.setState(() => (this.initialState()))
    }

    renderSwitch() {
        switch (this.state.quizState) {
            case QuizState.Start:
                return <PokemonQuizStart handleStartQuiz={this.handleQuizStart}></PokemonQuizStart>
            case QuizState.InProgress:
                return (
                    this.state.quiz === undefined ?
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner> :
                        <div>
                            <p className="pokemon-quiz-question-counter">Question: {this.state.currentQuestion + 1} / {this.state.quiz && this.state.quiz.questions.length}</p>
                            <PokemonQuizQuestion key={this.state.currentQuestion}
                                                 questionInfo={this.state.quiz.questions[this.state.currentQuestion]}
                                                 handleAnsweredQuestion={this.handleQuestionAnswered}>
                            </PokemonQuizQuestion>
                        </div>

                )
            case QuizState.Finished:
                return <PokemonQuizResults score={this.state.score}
                                           handleStartOverQuiz={this.handleQuizStartOver}></PokemonQuizResults>
        }
    }

    render() {
        return (
            <div className="pokemon-quiz-question">
                {this.renderSwitch()}
            </div>
        )

    }
}