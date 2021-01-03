package models

import play.api.libs.json.Json

case class User(id: String, username: String, password: String)

object User {
  implicit val userWrites = Json.writes[User]
}
