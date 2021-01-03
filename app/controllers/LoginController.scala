package controllers

import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._
import play.mvc.Results.noContent
import services.CsvManager

@Singleton
class LoginController @Inject()(val controllerComponents: ControllerComponents)
    extends BaseController {

  def getUsers = Action {
    Ok(Json.toJson(CsvManager.ReadUsersCsv()))
  }

  def addUser(username: String, password: String) = Action { _ =>
    CsvManager.WriteUserCsv(username, password)
    NoContent
  }
}
