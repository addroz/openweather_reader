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
        console.log(weather.weather.temp)
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

    getLat(id) {
        for(let i = 0; i < this.cityList.length; ++i) {
            if (this.cityList[i].id == id) return this.cityList[i].lat
        }
        return 0
    }

    getLon(id) {
        for(let i = 0; i < this.cityList.length; ++i) {
            if (this.cityList[i].id == id) return this.cityList[i].lon
        }
        return 0
    }

    getWeather(cityId, value, cached) {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.getLat(cityId) + '&lon=' + this.getLon(cityId) + '&exclude=current,minutely&appid=' + apiKey)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({value: value, weather: this.prepareWeatherData(data), cachedData: this.state.cachedData,
                    forecastMode: this.state.forecastMode, id: this.state.id})
            })
            .catch((err) => console.log(err));
    }

    changeSelectedCity(id) {
        document.store.dispatch({type: 'SELECT', id: id})
    }

    constructor (props) {
        super(props)
        this.state = {
            id: -1,
            value: '',
            weather: 'No city selected',
            cachedData: [],
            forecastMode: FORECAST_MODE.HOURLY
        }
    }

    setForecastModeHourly() {
        this.setState({value: this.state.value, weather: this.state.weather, cachedData:
            this.state.cachedData, forecastMode: FORECAST_MODE.HOURLY})
    }

    setForecastModeDaily() {
        this.setState({value: this.state.value, weather: this.state.weather, cachedData:
            this.state.cachedData, forecastMode: FORECAST_MODE.DAILY})
    }

    render() {
        return (
            <div>
                <div>
                    <button name="forecast" onClick={e => {this.setState({value: this.state.value, weather: this.state.weather, cachedData:
                        this.state.cachedData, forecastMode: FORECAST_MODE.HOURLY, id: this.state.id})
                        this.getWeather(this.state.id, this.state.value)}}>
                        Forecast - hourly
                    </button>
                    <button name="forecast" onClick={e => {this.setState({value: this.state.value, weather: this.state.weather, cachedData:
                        this.state.cachedData, forecastMode: FORECAST_MODE.DAILY, id: this.state.id})
                        this.getWeather(this.state.id, this.state.value)}}>
                        Forecast - daily
                    </button>
                </div>
                <ReactAutocomplete
                    items={this.cityList}
                    shouldItemRender={(item, value) => value.length > 3 &&
                        item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) =>
                        <div
                            key={item.id}
                            style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                        >
                            {item.label}
                        </div>
                    }
                    value={this.state.value}
                    onChange={e => this.setState({value: e.target.value, weather: this.state.weather, cachedData:
                            this.state.cachedData,forecastMode: this.state.forecastMode, id: this.state.id})}
                    onSelect={(value, item) => {
                        console.log(value)
                        this.changeSelectedCity(item.id)
                        this.setState({value: value, weather: '', cachedData: this.state.cachedData,
                            forecastMode: this.state.forecastMode, id: item.id})
                        this.getWeather(item.id, value)
                    }}
                />
                <div>
                    {this.state.weather}
                </div>
            </div>
        );
    }
}
