package controllers

import javax.inject.{Inject, Singleton}
import models.QuizResponse
import play.api.libs.json.Json
import play.api.mvc._
import services.QuizServiceImpl

import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class QuizController @Inject()(val controllerComponents: ControllerComponents,
                               val quizService: QuizServiceImpl)
    extends BaseController {

  def createQuiz(): Action[AnyContent] = Action.async { _ =>
    quizService.createQuiz().map(r => Ok(Json.toJson(r)))
  }

  def calculateQuizResponseMark(): Action[AnyContent] = Action { request =>
    io.circe.parser
      .decode[QuizResponse](request.body.asJson.get.toString) match {
      case Right(value) =>
        Ok(quizService.calculateQuizResponseGrade(value).toString)
      case Left(e) => InternalServerError(e.toString)
    }
  }
}
