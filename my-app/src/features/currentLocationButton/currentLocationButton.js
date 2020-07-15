import React from 'react';
import {changeLocation, weatherLoaded} from "../../actions";
import {connect} from "react-redux";
import {getWeather} from "../weatherFetcher";

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
            <button name="forecast" onClick={e => forecastForMyLocation(e, forecastMode, weatherLoaded, changeSelection)}>
                Forecast for my current location
            </button>
        </div>
    );
}

CurrentLocationButton = connect(mapStateToProps, mapDispatchToProps)(CurrentLocationButton)
export default CurrentLocationButton
