import React from "react";
import styled from "styled-components";
import Options from "../Inputs/Options";
import AnchorButton from "../buttons/AnchorButton";

const Title = styled.div`
font-size: 30px;
`;


// TODO: Convert to functional component,
// TODO: Access getters and setters using context.
class DisplayRounds extends React.Component {
    render() {
        return (
            <div>
                <Title>{this.props.name}</Title>
                <div className='StopWatch'>
                    <Options options={[...Array(24).keys()]} onChange={this.props.onSetHours} name='Hours' />
                    <Options options={[...Array(60).keys()]} onChange={this.props.onSetMinutes} name='Minutes' />
                    <Options options={[...Array(60).keys()]} onChange={this.props.onSetSeconds} name='Seconds' />
                </div>
                <div className='Preview Small'>
                    <Options options={[...Array(11).keys()]} onChange={this.props.onSetRounds} name='Rounds' />
                </div>
                <div className='Preview'>
                    {this.props.onConvertToTime()}
                </div>
                <AnchorButton name='Start timing' onClick={this.props.onStartTiming} />
                <AnchorButton name='Close Timer' onClick={this.props.onStopTimer} />
            </div>
        )
    }
}
//onSetHours onSetMinutes onSetSeconds onSetRounds onConvertToTime onStartTiming onStopTimer
export default DisplayRounds;