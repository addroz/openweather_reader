import React from 'react';
import './App.css';
import {CitySelect} from './features/citySelect/citySelect.js';
import {createStore} from 'redux'
const apiKey = '2f43081da337fcebfc53e06c931c16a5';

const MODE = {
    LIGHT: "light",
    DARK: "dark"
}

const initialSelection = {
    cityId: -1,
    mode: MODE.LIGHT
}

function changeMode(state) {
    if (state.mode === MODE.LIGHT) {
        return {
            ...state, mode: MODE.DARK
        }
    } else {
        return {
            ...state, mode: MODE.LIGHT
        }
    }
}

function counter(state = initialSelection, action) {
    if (action.type === 'MODE') {
        return changeMode(state)
    }

    if (action.type === 'SELECT') {
        return {
            ...state, cityId: action.id
        }
    }

    return state
}

function getWeather(cityId) {
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&appid=' + apiKey)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
}

const store = createStore(counter)
document.store = store

function App() {

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
    })

    return (
        <div className="App">
            <header className="App-header">
                <CitySelect/>
            </header>
            <footer>
                Author: Adam Drożyński, 395133
            </footer>
        </div>
      );
}

export default App;
