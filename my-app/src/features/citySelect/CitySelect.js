import React, {Component} from 'react';
import data from './city.list.json'
import ReactAutocomplete from 'react-autocomplete'

const apiKey = '2f43081da337fcebfc53e06c931c16a5';

const FORECAST_MODE = {
    HOURLY: "hourly",
    DAILY: "daily"
}

export class CitySelect extends Component {
    cityList = data.map((e) => {
        return (
            {id: e.id, label: e.name, lon: e.coord.lon, lat: e.coord.lat}
        )
    });

    getWeatherHour(weather) {
        return (
            <div>

                {weather.weather[0].main}, temperature: {weather.temp - 272.15}
            </div>
        )
    }

    getWeatherDay(weather) {
        return (
            <div>
                {weather.weather[0].main}, temperature: {weather.temp.day - 272.15}
            </div>
        )
    }

    prepareWeatherData(data) {
        if (this.state.forecastMode === FORECAST_MODE.HOURLY) {
            let elements = []
            for (let i = 0; i < 48; ++i) elements.push(i)
            return(
                <div>
                    {elements.map((value, index) => {
                        return <div key={"hour_" + index}>Hours from now: {value} {this.getWeatherHour(Object.values(data.hourly)[value])}</div>
                    })}
                </div>
            )
        } else {
            let elements = []
            for (let i = 0; i < 7; ++i) elements.push(i)
            return(
                <div>
                    {elements.map((value, index) => {
                        return <div key={"day_" + index}>Days from now: {value} {this.getWeatherDay(Object.values(data.daily)[value])}</div>
                    })}
                </div>
            )
        }
    }

    computeNiceness(data) {
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
            avg += (Object.values(data.daily)[i].temp.day - 272.15)
        }
        avg /= 7
        if(avg >= 18 && avg <= 25) niceness ++

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

    getLat(id) {
        for(let i = 0; i < this.cityList.length; ++i) {
            if (this.cityList[i].id === id) return this.cityList[i].lat
        }
        return 0
    }

    getLon(id) {
        for(let i = 0; i < this.cityList.length; ++i) {
            if (this.cityList[i].id === id) return this.cityList[i].lon
        }
        return 0
    }

    getWeather(lon, lat, cached) {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +
            '&exclude=current,minutely&appid=' + apiKey)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({weather: this.prepareWeatherData(data), cachedData: this.state.cachedData,
                    forecastMode: this.state.forecastMode, lon: lon, lat: lat, value: this.state.value, niceness: this.computeNiceness(data)})
            })
            .catch((err) => console.log(err));
    }

    changeSelectedCity(id) {
        document.store.dispatch({type: 'SELECT', id: id})
    }

    constructor (props) {
        super(props)
        this.state = {
            lon: 0,
            lat: 0,
            value: '',
            weather: 'No city selected',
            cachedData: [],
            forecastMode: FORECAST_MODE.HOURLY,
            niceness: 0
        }
    }

    setForecastModeHourly() {
        this.setState({weather: this.state.weather, cachedData: this.state.cachedData, niceness : this.state.niceness,
            forecastMode: FORECAST_MODE.HOURLY, lon: this.state.lon, lat: this.state.lat, value: this.state.value})
    }

    setForecastModeDaily() {
        this.setState({weather: this.state.weather, cachedData: this.state.cachedData, niceness : this.state.niceness,
            forecastMode: FORECAST_MODE.DAILY, lon: this.state.lon, lat: this.state.lat, value: this.state.value})
    }

    showPosition(parent, position) {
        document.position = position
        parent.setState({weather: parent.state.weather, cachedData: parent.state.cachedData, niceness : this.state.niceness,
            forecastMode: parent.state.forecastMode, lon: position.coords.longitude, lat: position.coords.latitude, value: parent.state.value})
        console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude)
    }

    positionLoaded() {
        if (document.position === null || document.position === undefined) {
            console.log("Error - Localization not loaded")
            return
        }
        this.setState({weather: this.state.weather, cachedData: this.state.cachedData, niceness : this.state.niceness,
            forecastMode: this.state.forecastMode, lon: document.position.coords.longitude, lat: document.position.coords.latitude,
            value: this.state.value})
        this.getWeather(document.position.coords.longitude, document.position.coords.latitude)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async forecastForMyLocation(e) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => document.position = position, e => console.log(e));
            // Wiem, że to bardzo prymitywne rozwiązanie ale nie za bardzo potrafiłem to zrobić inaczej,
            // a przy założeniu że dostęp do lokalizacji jest włączony cały czas to 200 ms powinno wystarcznyć
            // jednocześnie nie przeszkadzając w używaniu
            await this.sleep(200);
            this.positionLoaded()
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    getNiceness() {
        if (this.state.lon === 0 && this.state.lat === 0) {
            return (
                <div></div>
            )
        }
        let result = ""

        if (this.state.niceness === 3) {
            result = "nice"
        } else if (this.state.niceness === 2) {
            result = "passable"
        } else {
            result = "not nice"
        }

        return (
            <div>
                Generally weather in the upcoming week will be: {result}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>
                    <button name="forecast" onClick={e => {
                        this.setState({weather: this.state.weather, cachedData: this.state.cachedData, niceness : this.state.niceness,
                            forecastMode: FORECAST_MODE.HOURLY, lon: this.state.lon, lat: this.state.lat,
                        value: this.state.value})
                        this.getWeather(this.state.lon, this.state.lat)}}>

                        Forecast - hourly
                    </button>
                    <button name="forecast" onClick={e => {
                        this.setState({weather: this.state.weather, cachedData: this.state.cachedData, niceness : this.state.niceness,
                        forecastMode: FORECAST_MODE.DAILY, lon: this.state.lon, lat: this.state.lat,
                        value: this.state.value})
                        this.getWeather(this.state.lon, this.state.lat)}}>

                        Forecast - daily
                    </button>
                </div>
                <div>
                    <div>
                        <button name="forecast" onClick={e => this.forecastForMyLocation(e)}>
                            Forecast for my current location
                        </button>
                    </div>
                </div>
                <ReactAutocomplete
                    items={this.cityList}
                    shouldItemRender={(item, value) => value.length > 3 &&
                        item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: 'ivory', color: 'black'}}
                        >
                            {item.label}
                        </div>
                    }
                    value={this.state.value}
                    onChange={e => {
                        this.setState({
                            value: e.target.value, weather: this.state.weather, cachedData: this.state.cachedData,
                            forecastMode: this.state.forecastMode, lon: this.state.lon, lat: this.state.lat, niceness : this.state.niceness,
                        })
                    }}
                    onSelect={(value, item) => {
                        this.changeSelectedCity(item.id)
                        this.setState({weather: '', cachedData: this.state.cachedData, forecastMode: this.state.forecastMode,
                            lon: item.lon, lat: item.lat, value: value, niceness : this.state.niceness,})
                        this.getWeather(item.lon, item.lat)
                    }}
                />
                <div>
                    {this.getNiceness()}
                </div>
                <div>
                    {this.state.weather}
                </div>
            </div>
        );
    }
}
