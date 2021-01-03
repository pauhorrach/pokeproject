import React from 'react';
import {Card} from "react-bootstrap";
import ImagesCarousel from "../images-carousel/images-carousel";

export type IPokemon = {
    id: Number,
    images: string[],
    name: string,
}

interface IProps {
    pokemon: IPokemon
}

interface IState {

}


class Pokemon extends React.Component<IPokemon, IState> {
    constructor(props: IPokemon) {
        super(props);

        this.state = {}
    }
    render() {
        return (
        <Card className="card-display">
            {/*<Card.Img variant="top" src={this.props.imageURL} />*/}
            <ImagesCarousel images={this.props.images} />
            <Card.Body>
                <Card.Title>{this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}</Card.Title>
                <Card.Text>
                    {this.props.id && this.props.id || ''}
                </Card.Text>
            </Card.Body>
        </Card>
        )
    }
}

export default Pokemon