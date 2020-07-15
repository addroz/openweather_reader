import React from 'react';
import {connect} from 'react-redux'
import {changeMode} from "../../actions.js"

let ModeSelect = ({dispatch}) => {
    return (
        <div>
            <input type="checkbox" id="mode" name="mode" value="mode" onClick={e => {
                dispatch(changeMode())
            }}/>
            <label htmlFor="mode">Night mode</label><br/>
        </div>
    );
}


ModeSelect = connect()(ModeSelect)
export default ModeSelect