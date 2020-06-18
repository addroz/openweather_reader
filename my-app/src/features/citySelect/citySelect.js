import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export function CitySelect() {
    return (
        <div>
            <div>
                <input type="text" aria-label="Select" >
                </input>
                <button aria-label="Select" >
                    Select
                </button>
            </div>
        </div>
    );
}