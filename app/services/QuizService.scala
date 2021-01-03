package services

import models.{Quiz, QuizResponse}

import scala.concurrent.Future

trait QuizService {
  def createQuiz(): Future[Quiz]
  def calculateQuizResponseGrade(response: QuizResponse): Int
}
