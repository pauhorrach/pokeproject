import React from "react"
import { Button, Form } from "react-bootstrap"
import { PokemonInterface } from "../../interfaces/pokemon.interface"
import ErrorToaster from "../error-toaster/error-toaster"
import { PokemonCard } from "../pokemon-card/pokemon-card"
import './pokemon-searcher.scss'

type IState = {
    pokemon?: PokemonInterface,
    searchText: string,
    searchDone: boolean,
    isLoading: boolean,
    badSearch: boolean,
}

export class PokemonSearcher extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            pokemon: undefined,
            searchText: "",
            searchDone: false,
            isLoading: false,
            badSearch: false,

        }
        this.handleInputChanges = this.handleInputChanges.bind(this)
        this.handleNewSearch = this.handleNewSearch.bind(this)
        this.handleNewRandomSearch = this.handleNewRandomSearch.bind(this)
    }

    handleInputChanges(event: any) {
        this.setState({
            searchText: event.target.value
        }
        )
    }

    handleNewSearch() {
        this.setState({ isLoading: true })
        fetch(`http://localhost:9000/api/pokemon/${this.state.searchText}`)
            .then(response => response.json())
            .then(data => this.setState({
                pokemon: data,
                searchDone: true,
                isLoading: false
            })
            )
            .catch(er => this.setState({ badSearch: true }))
    }

    handleNewRandomSearch() {
        this.setState({ isLoading: true })
        fetch(`http://localhost:9000/api/pokemon/random`)
            .then(response => response.json())
            .then(data => this.setState({
                pokemon: data,
                searchDone: true,
                isLoading: false
            }))
    }

    renderPokemonCard() {
        if (this.state.pokemon) {
            return <PokemonCard pokemon={this.state.pokemon} minimized={false} />
        }
    }

    render() {
        return (
            <div className="parent">
                <div>
                    <img
                        src="/pokeball-logo.png"
                        width="200px"
                        className="main-image"
                    />
                    <Form className="search-input">
                        <Form.Group controlId="searchCtrl">
                            <Form.Control type="text" value={this.state.searchText} placeholder="Write a Pokemon name"
                                onChange={this.handleInputChanges} />
                        </Form.Group>
                    </Form>
                    <div className="button-group">
                        <Button className="button" variant="secondary" onClick={this.handleNewRandomSearch}>I'm
                                Feeling Lucky</Button>{' '}
                        <Button className="button" variant="primary"
                            onClick={this.handleNewSearch}>Search</Button>{' '}
                    </div>
                </div>
                {this.state.searchDone ? this.state.isLoading ? <p>Loading...</p> : this.renderPokemonCard() :
                    <div></div>}
                {this.state.badSearch ? <ErrorToaster errorMessage="This Pokemon does not exist" /> : <p></p>}
            </div>
        );
    }
}

