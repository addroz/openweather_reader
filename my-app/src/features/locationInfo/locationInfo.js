import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"

const mapStateToProps = state => {
    return {
        weather: state.weather,
        selected: state.selected,
        niceness: state.niceness
    }
}

function getNiceness(selected, niceness) {
    if (!selected) {
        return (
            <div/>
        )
    }
    let result = ""

    if (niceness === 3) {
        result = "nice"
    } else if (niceness === 2) {
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

let LocationInfo = ({weather, selected, niceness}) => (
    <div>
        <div>
            {getNiceness(selected, niceness)}
        </div>
        <div>
            {weather}
        </div>
    </div>
)


LocationInfo.propTypes = {
    weather: PropTypes.object,
    selected: PropTypes.bool,
    niceness: PropTypes.number,
}

LocationInfo = connect(mapStateToProps)(LocationInfo)

export default LocationInfo
