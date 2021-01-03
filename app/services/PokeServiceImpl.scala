package services

import javax.inject.Inject
import models.{Habitat, Pokemon}
import play.api.http.DefaultHttpErrorHandler.onClientError
import play.api.http.HttpErrorHandler
import play.api.libs.json.Json
import play.api.libs.ws._
import play.api.mvc.Results.{BadRequest, NotFound}
import io.circe._

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent._

class PokeServiceImpl @Inject()(ws: WSClient) extends PokeService {

  override def getPokemonByHabitat(habitat: String): Future[List[Pokemon]] = {
    ws.url(s"https://pokeapi.co/api/v2/pokemon-habitat/$habitat/")
      .get()
      .flatMap { response =>
        if (response.status == 200)
          Future.successful(Json.parse(response.body).as[Habitat])
        else null
      }
      .flatMap { habitat =>
        Future
          .sequence(habitat.pokemonSpecies.map { specie =>
            getPokemonByNameOrId(specie.name)
          })
          .map(_.flatten)
      }
  }

  override def getPokemonByRandomId(): Future[Option[Pokemon]] = {
    val randomId = scala.util.Random.nextInt(898)
    getPokemonByNameOrId(randomId.toString)
  }

  override def getPokemonByNameOrId(name: String): Future[Option[Pokemon]] = {
    ws.url(s"https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/")
      .get()
      .flatMap { response =>
        if (response.status == 200) {
          io.circe.parser
            .decode[Pokemon](Json.parse(response.body).toString()) match {
            case Right(value) => Future.successful(Some(value))
            case Left(e)      => Future.successful(None)
          }
        } else Future.successful(None)
      }
  }
}
