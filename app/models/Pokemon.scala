package models

import akka.io.Tcp.Write
import play.api.libs.functional.syntax._
import play.api.libs.json.{JsPath, JsSuccess, JsValue, Json, Reads, Writes}
import io.circe._
import io.circe.generic.semiauto.deriveEncoder

case class Pokemon(id: Int,
                   name: String,
                   images: List[String],
                   types: List[String],
                   height: Int,
                   weight: Int) {}

object Pokemon {

  implicit val pokemonWrites: Writes[Pokemon] = Json.writes[Pokemon]

  implicit val pokemonDecoder: Decoder[Pokemon] =
    (hCursor: HCursor) => {
      for {
        id <- hCursor.get[Int]("id")
        name <- hCursor.get[String]("name")
        images <- imagesListDecoder(hCursor)
        typeList <- {
          hCursor
            .downField("types")
            .as[List[Json]]
            .map(typeJson =>
              typeJson.flatMap { json =>
                val maybeType = for {
                  typeDescription <- json.hcursor
                    .downField("type")
                    .downField("name")
                    .as[String]
                } yield typeDescription
                maybeType match {
                  case Right(value) => Some(value)
                  case Left(e)      => None
                }
            })
        }
        height <- hCursor.get[Int]("height")
        weight <- hCursor.get[Int]("weight")
      } yield Pokemon(id, name, images, typeList, height, weight)
    }

  /*Traverse[List].traverse(orderItemsJson)(orderItemsJson => {
    orderItemsJson.hcursor.downField("voucher").downField("discount").as[Int]
  })*/

  // With a getOrElse can I just return nothing on the else
  private val imagesListDecoder: Decoder[List[String]] =
    (h: HCursor) => {
      for {
        frontImage <- h.downField("sprites").get[String]("front_default")
        backImage <- h.downField("sprites").get[String]("back_default")
        backShinyImage = h
          .downField("sprites")
          .get[String]("back_shiny")
        frontShinyImage = h
          .downField("sprites")
          .get[String]("front_shiny")
        frontShinyFemale = h
          .downField("sprites")
          .get[String]("front_shiny_female")
      } yield
        List(Some(frontImage),
             Some(backImage),
             backShinyImage.toOption,
             frontShinyImage.toOption,
             frontShinyFemale.toOption).flatten
    }

  private val typeDecoder: Decoder[String] =
    (h: HCursor) => {
      for {
        pokemonType <- h.downField("type").get[String]("name")
      } yield pokemonType
    }
}
