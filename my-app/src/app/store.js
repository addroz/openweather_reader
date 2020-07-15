import {ACTIONS, FORECAST_MODE, MODE} from "../const";

const initialSelection = {
  lon: 0,
  lat: 0,
  selected: false,
  niceness: 0,
  mode: MODE.LIGHT,
  forecastMode: FORECAST_MODE.HOURLY,
  autocompleteValue: '',
  weather: ''
}

function changeMode(state) {
  if (state.mode === MODE.LIGHT) {
    document.body.style.backgroundColor = 'black'
    document.body.style.color = 'ivory'
    return {
      ...state, mode: MODE.DARK
    }
  } else {
    document.body.style.backgroundColor = 'ivory'
    document.body.style.color = 'black'
    return {
      ...state, mode: MODE.LIGHT
    }
  }
}

export function counter(state = initialSelection, action) {
  if (action.type === ACTIONS.CHANGE_MODE) {
    return changeMode(state)
  }

  if (action.type === ACTIONS.CHANGE_AUTOCOMPLETE_VALUE) {
    return {
      ...state, autocompleteValue: action.value
    }
  }

  if (action.type === ACTIONS.CHANGE_LOCATION) {
    return {
      ...state, autocompleteValue: action.value, lat: action.lat, lon: action.lon, selected: true
    }
  }

  if (action.type === ACTIONS.WEATHER_LOADED) {
    return {
      ...state, weather: action.weather, niceness: action.niceness
    }
  }

  if (action.type === ACTIONS.CHANGE_FORECAST_MODE) {
    return {
      ...state, weather: action.weather, niceness: action.niceness
    }
  }

  return state
}
