package services

import javax.inject.Inject
import models.{Quiz, QuizAnswer, QuizQuestion, QuizResponse}

import scala.concurrent.Future
import scala.util.Random.nextInt
import scala.concurrent.ExecutionContext.Implicits.global

class QuizServiceImpl @Inject()(pokeService: PokeServiceImpl)
    extends QuizService {

  def createQuiz(): Future[Quiz] = {
    val randomListIdLists: List[List[Int]] =
      List.fill(10)(scala.util.Random.shuffle((1 to 500).toList).take(4))     
    
    Future
      .sequence(
        randomListIdLists.map(
          idList =>
            Future
              .sequence(idList.map(id =>
                pokeService.getPokemonByNameOrId(id.toString)))
              .map(_.flatten)
              .map(pokemonList => QuizQuestion.fromPokemon(pokemonList))))
      .map(quizQuestionList => Quiz(quizQuestionList))
  }

  def calculateQuizResponseGrade(response: QuizResponse): Int = {
    response.answers.map(answer => calculateQuizAnswerGrade(answer)).sum
  }

  private def calculateQuizAnswerGrade(answer: QuizAnswer): Int = {
    if (answer.userAnswer.trim.toLowerCase() == answer.solution.trim
          .toLowerCase()) {
      10 - answer.usedHints
    } else 0
  }
}
