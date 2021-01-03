import logo from './logo.svg';
import './App.css';
import React from 'react';
import Pokemon, {IPokemon} from "./components/pokemon/pokemon";
import Header from "./components/header/header";
import {Button, Form} from 'react-bootstrap';
import ErrorToaster from "./components/error-toaster/error-toaster";


interface IProps {
}

interface IState {
    name: string,
    id: Number,
    images: string[],
    searchDone: boolean,
    isLoading: boolean,
    badSearch: boolean,
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            name: '',
            id: 0,
            images: [],
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
                id: Number.NaN, images: [], name: event.target.value, searchDone: false
            }
        )
    }

    handleNewSearch() {
        this.setState({isLoading: true})
        fetch(`http://localhost:9000/api/pokemon/${this.state.name}`)
            .then(response => response.json())
            .then(data => this.setState({
                    name: data.name,
                    id: data.id,
                    images: data.images,
                    searchDone: true,
                    isLoading: false
                })
            )
            .catch(er => this.setState({badSearch: true}))
    }

    handleNewRandomSearch() {
        this.setState({isLoading: true})
        fetch(`http://localhost:9000/api/pokemon/random`)
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                id: data.id,
                images: data.images,
                searchDone: true,
                isLoading: false
            }))
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div></div>
                <div className="parent">
                    <div>
                        //fkshfksjdhfkjshdkjss
                        <Form className="search-input">
                            <Form.Group controlId="searchCtrl">
                                <Form.Label>Find a Pokemon</Form.Label>
                                <Form.Control type="text" value={this.state.name} placeholder="Write a Pokemon name"
                                              onChange={this.handleInputChanges}/>
                                <Form.Text className="text-muted">
                                    *You can also write an ID
                                </Form.Text>
                            </Form.Group>
                        </Form>
                        <div className="button-group">
                            <Button className="button" variant="secondary" onClick={this.handleNewRandomSearch}>I'm
                                Feeling Lucky</Button>{' '}
                            <Button className="button" variant="primary"
                                    onClick={this.handleNewSearch}>Search</Button>{' '}
                        </div>
                    </div>
                    {this.state.searchDone ? this.state.isLoading ? <p>Loading...</p> :
                        <Pokemon name={this.state.name} id={this.state.id} images={this.state.images}/> :
                        <div></div>}
                </div>
                {this.state.badSearch ? <ErrorToaster errorMessage="This Pokemon does not exist" /> : <p></p>}
            </div>
        );
    }
}

export default App;
