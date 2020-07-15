import React from 'react';
import {changeLocation, weatherLoaded} from "../../actions";
import {connect} from "react-redux";
import {getWeather} from "../weatherFetcher";
import styled from "styled-components";

const StyledButton = styled.button`
    border: 0px outset;
    background-color: ivory;
    color: black;
    width: 50;
    height: 30;
    cursor:pointer;
    &:hover {
        background-color: black;
        color:ivory;
    }
`

function loadedPosition(position, forecastMode, weatherLoaded, changeSelection) {
    changeSelection(position.coords.latitude, position.coords.longitude)
    getWeather(position.coords.latitude, position.coords.longitude, weatherLoaded, forecastMode)
}

function forecastForMyLocation(e, forecastMode, weatherLoaded, changeSelection) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => loadedPosition(position, forecastMode, weatherLoaded, changeSelection),
            (e) => console.log(e));
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

const mapStateToProps = state => {
    return {
        forecastMode: state.forecastMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSelection: (lat, lon) => {
            dispatch(changeLocation(lat, lon))
        },
        weatherLoaded: (weather, niceness) => {
            dispatch(weatherLoaded(weather, niceness))
        }
    }
}

let CurrentLocationButton = ({forecastMode, changeSelection, weatherLoaded}) => {
    return (
        <div>
            <StyledButton name="forecast" onClick={e => forecastForMyLocation(e, forecastMode, weatherLoaded, changeSelection)}>
                Forecast for my current location
            </StyledButton>
        </div>
    );
}

CurrentLocationButton = connect(mapStateToProps, mapDispatchToProps)(CurrentLocationButton)
export default CurrentLocationButton
