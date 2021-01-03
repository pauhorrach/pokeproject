package services

import models.Pokemon

import scala.concurrent.Future

trait PokeService {
  def getPokemonByHabitat(habitat: String): Future[List[Pokemon]]
  def getPokemonByNameOrId(habitat: String): Future[Option[Pokemon]]
  def getPokemonByRandomId(): Future[Option[Pokemon]]
}
