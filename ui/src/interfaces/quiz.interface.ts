export interface QuizInterface {
    questions: QuizQuestionInterface[];
}

export interface QuizQuestionInterface {
    question: string;
    answer: string;
    options: string[];
    hints: QuizQuestionHintInterface[];
}

export interface QuizQuestionHintInterface{
    hint: string;
}

export interface QuizResponseInterface {
    answers: QuizAnswerInterface[]
}

export interface QuizAnswerInterface {
    userAnswer: string;
    solution: string;
    usedHints: number;
}
