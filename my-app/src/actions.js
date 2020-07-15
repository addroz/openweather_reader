import {ACTIONS} from "./const.js"
import {FORECAST_MODE} from "./const";

export function changeMode() {
    return {
        type: ACTIONS.CHANGE_MODE
    }
}

export function changeLocationAndSelection(lat, lon, value) {
    return {
        type: ACTIONS.CHANGE_LOCATION,
        value: value,
        lat: lat,
        lon: lon
    }
}

export function changeLocation(lat, lon) {
    return {
        type: ACTIONS.CHANGE_LOCATION,
        lat: lat,
        lon: lon
    }
}


export function changeAutocompleteValue(value) {
    return {
        type: ACTIONS.CHANGE_AUTOCOMPLETE_VALUE,
        value: value
    }
}

export function weatherLoaded(weather, niceness) {
    return {
        type: ACTIONS.WEATHER_LOADED,
        weather: weather,
        niceness: niceness
    }
}

export function changeForecastModeHourly() {
    return {
        type: ACTIONS.CHANGE_FORECAST_MODE,
        mode: FORECAST_MODE.HOURLY
    }
}

export function changeForecastModeDaily() {
    return {
        type: ACTIONS.CHANGE_FORECAST_MODE,
        mode: FORECAST_MODE.DAILY
    }
}
