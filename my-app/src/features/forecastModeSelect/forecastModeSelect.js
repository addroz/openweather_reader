import React from 'react';
import {connect} from "react-redux";
import {changeForecastModeDaily, changeForecastModeHourly, weatherLoaded} from "../../actions";
import {getWeather} from "../weatherFetcher";
import {FORECAST_MODE} from "../../const";
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
            <StyledButton name="forecast" onClick={e => {
                modeHourly()
                getWeather(lat, lon, weatherLoaded, FORECAST_MODE.HOURLY)
            }}>

                Forecast - hourly
            </StyledButton>
            <StyledButton name="forecast" onClick={e => {
                modeDaily()
                getWeather(lat, lon, weatherLoaded, FORECAST_MODE.DAILY)
            }}>

                Forecast - daily
            </StyledButton>
        </div>
    );
}

ForecastModeSelect = connect(mapStateToProps, mapDispatchToProps)(ForecastModeSelect)
export default ForecastModeSelect