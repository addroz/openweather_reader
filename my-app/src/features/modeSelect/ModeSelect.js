import React, {Component} from 'react';

function dispatchModeChange() {
    document.store.dispatch({type: 'MODE'})
}

export class ModeSelect extends Component {
    render() {
        return (
            <div>
                <input type="checkbox" id="mode" name="mode" value="mode" onClick={dispatchModeChange}/>
                <label htmlFor="mode">Night mode</label><br/>
            </div>
        );
    }
}
