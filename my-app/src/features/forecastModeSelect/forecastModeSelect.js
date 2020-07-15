import React from 'react';
import {connect} from "react-redux";
import {changeForecastModeDaily, changeForecastModeHourly, weatherLoaded} from "../../actions";
import {getWeather} from "../weatherFetcher";
import {FORECAST_MODE} from "../../const";


const mapDispatchToProps = dispatch => {
    return {
        modeHourly: () => {
            dispatch(changeForecastModeHourly())
        },
        modeDaily: () => {
            dispatch(changeForecastModeDaily())
        },
        weatherLoaded: (weather, niceness) => {
            dispatch(weatherLoaded(weather, niceness))
        }
    }
}

const mapStateToProps = state => {
    return {
        lat: state.lat,
        lon: state.lon
    }
}

let ForecastModeSelect = ({lat, lon, modeHourly, modeDaily, weatherLoaded}) => {
    return (
        <div>
            <button name="forecast" onClick={e => {
                getWeather(lat, lon, weatherLoaded, FORECAST_MODE.HOURLY)
                modeHourly()
            }}>

                Forecast - hourly
            </button>
            <button name="forecast" onClick={e => {
                getWeather(lat, lon, weatherLoaded, FORECAST_MODE.DAILY)
                modeDaily()
            }}>

                Forecast - daily
            </button>
        </div>
    );
}

ForecastModeSelect = connect(mapStateToProps, mapDispatchToProps)(ForecastModeSelect)
export default ForecastModeSelect