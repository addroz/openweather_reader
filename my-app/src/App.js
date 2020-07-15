import React from 'react'
import './App.css'
import CitySelect from './features/citySelect/citySelect.js'
import ModeSelect from "./features/modeSelect/modeSelect";
import LocationInfo from "./features/locationInfo/locationInfo";
import ForecastModeSelect from "./features/forecastModeSelect/forecastModeSelect";
import CurrentLocationButton from "./features/currentLocationButton/currentLocationButton";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ModeSelect/>
                    <CitySelect/>
                    <ForecastModeSelect/>
                    <CurrentLocationButton/>
                    <LocationInfo/>
                </header>
                <footer>
                    Author: Adam Drożyński, 395133
                </footer>
            </div>
        );
    }
}

export default App;
