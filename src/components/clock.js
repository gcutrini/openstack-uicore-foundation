/**
 * Copyright 2020 OpenStack Foundation
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
import moment from "moment-timezone";
import FragmentParser from "./fragmen-parser";

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.fragmentParser = new FragmentParser();
        this.interval = null;
        this.state = {
            timestamp: 0
        }
    }

    async componentDidMount() {
        const {timezone = 'UTC', now} = this.props;
        const nowQS = this.fragmentParser.getParam('now');
        const nowOverride = nowQS || now;
        let timestamp;

        if (nowOverride) {
            timestamp = moment.tz(nowOverride, 'YYYY-MM-DD,hh:mm:ss', timezone).valueOf() / 1000;
        } else {
            const local = moment().unix();
            const serverTime =  await this.getServerTime();
            const localAfter = moment().unix();

            if (serverTime) {
                timestamp = serverTime.timestamp + (localAfter - local);
            } else {
                timestamp = localAfter;
            }
        }

        this.setState({timestamp});
        this.props.onTick(timestamp);

        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getServerTime = async () => {
        let response = await fetch(`https://timeintervalsince1970.appspot.com/`)
            .catch(err => {
                console.log(err);
                return null;
            });

        return await response.json();
    };

    tick = () => {
        const {timestamp} = this.state;
        this.props.onTick(timestamp + 1);
        this.setState({timestamp: timestamp + 1})
    };

    // epoch utc time in seconds
    now = () => {
        return this.state.timestamp;
    };

    render() {
        const {display, timezone = 'UTC'} = this.props;
        const {timestamp} = this.state;

        if (!display || !timestamp) return null;

        return (
            <div style={{marginTop: '50px', textAlign: 'center', fontSize: '20px'}}>
                {moment.tz(timestamp*1000, timezone).format('YYYY-MM-DD hh:mm:ss')}
            </div>
        );
    }

}

export default Clock;
