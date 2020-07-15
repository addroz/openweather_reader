import {FORECAST_MODE} from "../const";
import React from "react";

const apiKey = '2f43081da337fcebfc53e06c931c16a5';

export function getWeather(lat, lon, weatherLoaded, forecastMode) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +
        '&exclude=current,minutely&appid=' + apiKey)
        .then((response) => response.json())
        .then((data) => {
            weatherLoaded(prepareWeatherData(data, forecastMode), computeNiceness(data))
        })
        .catch((err) => console.log(err));
}

function getWeatherHour(weather) {
    return (
        <div>
            {weather.weather[0].main}, temperature: {weather.temp - 272.15}
        </div>
    )
}

function getWeatherDay(weather) {
    return (
        <div>
            {weather.weather[0].main}, temperature: {weather.temp.day - 272.15}
        </div>
    )
}

function prepareWeatherData(data, forecastMode) {
    if (forecastMode === FORECAST_MODE.HOURLY) {
        let elements = []
        for (let i = 0; i < 48; ++i) elements.push(i)
        return (
            <div>
                {elements.map((value, index) => {
                    return <div key={"hour_" + index}>Hours from
                        now: {value} {getWeatherHour(Object.values(data.hourly)[value])}</div>
                })}
            </div>
        )
    } else {
        let elements = []
        for (let i = 0; i < 7; ++i) elements.push(i)
        return (
            <div>
                {elements.map((value, index) => {
                    return <div key={"day_" + index}>Days from
                        now: {value} {getWeatherDay(Object.values(data.daily)[value])}</div>
                })}
            </div>
        )
    }
}

function computeNiceness(data) {
    let niceness = 0

    niceness++
    for (let i = 0; i < 7; ++i) {
        if (Object.values(data.daily)[i].weather[0].main === 'Rain') {
            niceness--
            break
        }
    }

    let avg = 0
    for (let i = 0; i < 7; ++i) {
        avg += Object.values(data.daily)[i].temp.day - 272.15
    }
    avg /= 7
    if (avg >= 18 && avg <= 25) niceness++

    niceness++
    for (let i = 0; i < 7; ++i) {
        if (Object.values(data.daily)[i].temp.day - 272.15 > 30 ||
            Object.values(data.daily)[i].temp.day - 272.15 < 15) {
            niceness--
            break
        }
    }

    return niceness
}