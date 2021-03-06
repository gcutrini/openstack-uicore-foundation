/**
 * Copyright 2017 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import {querySummits} from '../../utils/query-actions';

export default class SummitInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value
        };

        this.handleChange = this.handleChange.bind(this);
        this.getSummits = this.getSummits.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.hasOwnProperty('value') && this.state.value != nextProps.value) {
            this.setState({value: nextProps.value});
        }
    }

    handleChange(value) {
        let ev = {target: {
            id: this.props.id,
            value: value,
            type: 'summitinput'
        }};

        this.props.onChange(ev);
    }

    getSummits (input, callback) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }

        querySummits(input, callback);
    }


    render() {
        let {value, error, onChange, id, multi, ...rest} = this.props;
        let isMulti = (this.props.hasOwnProperty('multi'));
        let has_error = ( this.props.hasOwnProperty('error') && error != '' );

        return (
            <div>
                <AsyncSelect
                    value={value}
                    onChange={this.handleChange}
                    loadOptions={this.getSummits}
                    getOptionValue={op => op.id}
                    getOptionLabel={op => (`${op.name} (${op.id})`)}
                    isMulti={isMulti}
                    {...rest}
                />
                {has_error &&
                <p className="error-label">{error}</p>
                }

            </div>
        );

    }
}

