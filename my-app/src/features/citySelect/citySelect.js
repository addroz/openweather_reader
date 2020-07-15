import React from 'react';
import data from './city.list.json'
import ReactAutocomplete from 'react-autocomplete'
import {changeAutocompleteValue, changeLocationAndSelection, weatherLoaded} from '../../actions'
import {connect} from "react-redux"
import {getWeather} from "../weatherFetcher";


let cityList = data.map((e) => {
    return (
        {id: e.id, label: e.name, lon: e.coord.lon, lat: e.coord.lat}
    )
});

const mapStateToProps = state => {
    return {
        autocompleteValue: state.autocompleteValue,
        forecastMode: state.forecastMode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeValue: value => {
            dispatch(changeAutocompleteValue(value))
        },
        changeSelection: (lat, lon, value) => {
            dispatch(changeLocationAndSelection(lat, lon, value))
        },
        weatherLoaded: (weather, niceness) => {
            dispatch(weatherLoaded(weather, niceness))
        }
    }
}

let CitySelect = ({autocompleteValue, forecastMode, changeValue, changeSelection, weatherLoaded}) => {
    return (
        <div>
            <ReactAutocomplete
                items={cityList}
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
                value={autocompleteValue}
                onChange={e => changeValue(e.target.value)}
                onSelect={(value, item) => {
                    getWeather(item.lat, item.lon, weatherLoaded, forecastMode)
                    changeSelection(item.lat, item.lon, item.label)
                }}
            />
        </div>
    );

}

CitySelect = connect(mapStateToProps, mapDispatchToProps)(CitySelect)

export default CitySelect