package models

import io.circe.{Decoder, HCursor}
import play.api.libs.json.{Json, Writes}

case class QuizQuestionHint(hint: String)

case class QuizQuestion(question: String,
                        answer: String,
                        options: List[String],
                        hints: List[QuizQuestionHint])

case class Quiz(questions: List[QuizQuestion])

case class QuizAnswer(userAnswer: String, solution: String, usedHints: Int)

case class QuizResponse(answers: List[QuizAnswer])

object QuizQuestionHint {

  implicit val quizQuestionHintWriter: Writes[QuizQuestionHint] =
    Json.writes[QuizQuestionHint]

  def fromPokemon(hint: String): QuizQuestionHint = {
    QuizQuestionHint(
      hint
    )
  }
}

object QuizQuestion {

  implicit val quizQuestionWriter: Writes[QuizQuestion] =
    Json.writes[QuizQuestion]

  def fromPokemon(pokemons: List[Pokemon]): QuizQuestion = {
    QuizQuestion(
      pokemons.head.images.head,
      pokemons.head.name,
      pokemons.map(pokemon => pokemon.name),
      (pokemons.head.types
        .map(t => s"Its type is $t") ++ List(
        s"Its height is ${pokemons.head.height}",
        s"Its weight is ${pokemons.head.weight}",
        s"Its name starts with ${pokemons.head.name.charAt(0)}"))
        .map(hint => QuizQuestionHint.fromPokemon(hint))
    )
  }
}

object Quiz {
  implicit val quizWriter: Writes[Quiz] = Json.writes[Quiz]
}

object QuizAnswer {

  implicit val quizAnswerDecoder: Decoder[QuizAnswer] =
    (h: HCursor) => {
      for {
        userAnswer <- h.downField("userAnswer").as[String]
        solution <- h.downField("solution").as[String]
        usedHints <- h.downField("usedHints").as[Int]
      } yield QuizAnswer(userAnswer, solution, usedHints)
    }
}

object QuizResponse {

  implicit val quizResponseDecoder: Decoder[QuizResponse] =
    (h: HCursor) => {
      for {
        quizAnswers <- h
          .downField("answers")
          .as[List[QuizAnswer]]
      } yield QuizResponse(quizAnswers)
    }
}
