package services

import java.io.FileWriter

import models.User

import scala.util.Try

object CsvManager {
  def ReadUsersCsv(): List[User] = {
    scala.io.Source
      .fromResource("public/csv/users.csv")
      .getLines()
      .drop(1)
      .map(line => {
        val cols = line.split(",").map(_.trim)
        Try(User(cols(0), cols(1), cols(2))).get
      })
      .toList
  }

  def WriteUserCsv(username: String, password: String): Unit = {
    val writer = new FileWriter("public/csv/users.csv", true)
    writer.append(s"${10}, ${username}, ${password}\n")
    writer.flush()
    writer.close()
  }
}
