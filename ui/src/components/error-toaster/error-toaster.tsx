import React from 'react'
import {Toast} from "react-bootstrap";

interface IProps {
    errorMessage: String
}

interface IState {
    show: boolean
}

class ErrorToaster extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: true
        }
    }
    render() {
        return (
            <Toast  delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Something went wrong!</strong>
                </Toast.Header>
                <Toast.Body>{this.props.errorMessage}</Toast.Body>
            </Toast>
        )
    }
}

export default ErrorToaster