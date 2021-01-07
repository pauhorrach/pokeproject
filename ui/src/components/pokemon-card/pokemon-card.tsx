import React from 'react';
import { Card } from "react-bootstrap";
import './pokemon-card.scss';
import ImagesCarousel from '../common/images-carousel/images-carousel';
import { PokemonInterface } from '../../interfaces/pokemon.interface';

type IProps = {
    minimized: boolean,
    pokemon: PokemonInterface | string
}


export class PokemonCard extends React.Component<IProps, {}> {

    selectImageType() {
        if (typeof this.props.pokemon === "string") {
            return <Card.Img variant="top" src={this.props.pokemon} />
        } else {
            if (this.props.pokemon.images.length > 1) {
                return <ImagesCarousel images={this.props.pokemon.images} />
            } else {
                return <Card.Img variant="top" src={this.props.pokemon.images[0]} />
            }
        }
    }

    render() {
        return (
            <Card className="pokemon-card">
                {this.selectImageType()}
                {!this.props.minimized ? (
                    <Card.Body>
                        <Card.Title>{(this.props.pokemon as PokemonInterface).name.charAt(0).toUpperCase() + (this.props.pokemon as PokemonInterface).name.slice(1)}
                        </Card.Title>
                        <Card.Text>
                            {(this.props.pokemon as PokemonInterface).id}
                        </Card.Text>
                    </Card.Body>) : null}
            </Card>
        )
    }
}