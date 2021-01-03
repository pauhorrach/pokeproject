package models

import play.api.libs.json.Json

case class PokemonReference(name: String, url: String)

object PokemonReference {
  implicit val pokemonReferenceJsonFormat = Json.format[PokemonReference]
}

case class Habitat(id:Int, name: String, private val pokemon_species: List[PokemonReference]) {
  def pokemonSpecies: List[PokemonReference] = pokemon_species
}

object Habitat {
  implicit val habitatJsonFormat = Json.format[Habitat]
}
