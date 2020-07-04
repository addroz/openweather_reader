import React, {Component} from 'react';
import data from './city.list.json'
import ReactAutocomplete from 'react-autocomplete'

function changeSelectedCity(id) {
    document.store.dispatch({type: 'SELECT', id: id})
}

export class CitySelect extends Component {
    cityList = data.map((e) => {
        return (
            {id: e.id, label: e.name}
        )
    });

    constructor (props) {
        super(props)
        this.state = {
            value: '',
        }
    }

    render() {
        return (
            <div>
                <div>
                    <ReactAutocomplete
                        items={this.cityList}
                        shouldItemRender={(item, value) => value.length > 3 &&
                            item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                        getItemValue={item => item.id}
                        renderItem={(item, highlighted) =>
                            <div
                                key={item.id}
                                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
                            >
                                {item.label}
                            </div>
                        }
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                        onSelect={value => {
                            console.log(value)
                            changeSelectedCity(value)
                            this.setState({value})
                        }}
                    />
                    <button aria-label="Select" >
                        Select
                    </button>
                </div>
            </div>
        );
    }
}
