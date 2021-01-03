import React from 'react'
import {Carousel} from "react-bootstrap";

interface IProps {
    images: string[]
}

interface IState {
}

class ImagesCarousel extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {}
    }

    createCarouselItem(image: string) {
        return (
            <Carousel.Item key={image}>
                <img
                    className="d-block w-100"
                    src={image}
                />
            </Carousel.Item>
        )
    }

    render() {
        return (
            <Carousel>
                {this.props.images.map(image => this.createCarouselItem(image))}
            </Carousel>
        )
    }
}

export default ImagesCarousel