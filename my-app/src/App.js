import React from 'react'
import './App.css'
import {CitySelect} from './features/citySelect/CitySelect.js'
import {ModeSelect} from "./features/modeSelect/ModeSelect";
import {createStore} from "redux"

const MODE = {
    LIGHT: "light",
    DARK: "dark"
}

const initialSelection = {
    cityId: -1,
    weather: 'Nie wybrano żadnego miasta',
    mode: MODE.LIGHT
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

const store = createStore(counter)
document.store = store

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ModeSelect/>
                    <CitySelect/>
                </header>
                <footer>
                    Author: Adam Drożyński, 395133
                </footer>
            </div>
        );
    }
}

export default App;
