import React from "react";
import moment from 'moment';
import { SVGCircle } from "./svg-circle/svg-circle";
import './timer.scss'

type IProps = {
    time: number
    onTimeOver: () => void
}

type IState = {
    time: number
}

export class Timer extends React.Component<IProps, IState> {
    interval: any
    constructor(props: IProps) {
        super(props)
        this.state = {
            time: this.props.time,

        }
    }


    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => ({ time: prevState.time - 1 }));
        }, 1000);
    }

    componentDidUpdate() {
        if (this.state.time < 0) {
            this.props.onTimeOver();
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <div className="countdown-wrapper">
                <div className={this.state.time <= 5 ? "countdown-item blink-timer" : "countdown-item"}>
                    <SVGCircle radius={this.mapNumber(this.state.time, this.props.time, 0, 0, 360)} />
                    {this.state.time}
                    <span>seconds</span>
                </div>

            </div>
        );
    }

    mapNumber(number: any, in_min: any, in_max: any, out_min: any, out_max: any) {
        return (
            ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        );
    }
}
