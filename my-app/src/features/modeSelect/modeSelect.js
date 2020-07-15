import React from 'react';
import {connect} from 'react-redux'
import {changeMode} from "../../actions.js"
import styled from 'styled-components'

const ItalicDiv = styled.div`
   font-style: italic;
`
const StyledCheckbox = styled.input`
    width: 1.3em;
    height: 1.3em;
    background-color: white;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid #ddd;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    &:checked {
        background-color: gray;
    }
`

let ModeSelect = ({dispatch}) => {
    return (
        <ItalicDiv>
            <StyledCheckbox type="checkbox" id="mode" name="mode" value="mode" onClick={e => {
                dispatch(changeMode())
            }}/>
            <label htmlFor="mode">Night mode</label><br/>
        </ItalicDiv>
    );
}


ModeSelect = connect()(ModeSelect)
export default ModeSelect