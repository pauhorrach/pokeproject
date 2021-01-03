package controllers

import io.circe.syntax.EncoderOps
import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._
import services.{PokeService, PokeServiceImpl}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class PokeController @Inject()(val controllerComponents: ControllerComponents,
                               val pokeService: PokeServiceImpl)
    extends BaseController {

  def pokemonByHabitat(habitat: String): Action[AnyContent] = Action.async {
    _ =>
      pokeService.getPokemonByHabitat(habitat).map(r => Ok(Json.toJson(r)))
  }

  def pokemonByName(name: String): Action[AnyContent] = Action.async { _ =>
    pokeService
      .getPokemonByNameOrId(name)
      .map(x =>
        x match {
          case Some(value) => Ok(Json.toJson(value))
          case None        => NotFound("Pokemon no found")
      })
  }

  def pokemonByRandomId(): Action[AnyContent] = Action.async { _ =>
    pokeService
      .getPokemonByRandomId()
      .map(r =>
        r match {
          case Some(value) => Ok(Json.toJson(value))
          case None        => InternalServerError("Something went wrong")
      })
  }
}
