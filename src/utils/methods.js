/**
 * Copyright 2018 OpenStack Foundation
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

import moment from 'moment-timezone';
import URI from "urijs";

export const findElementPos = (obj) => {
    var curtop = -70;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

export const epochToMoment = (atime) => {
    if(!atime) return atime;
    atime = atime * 1000;
    return moment(atime);
}

export const epochToMomentTimeZone = (atime, time_zone) => {
    if(!atime) return atime;
    atime = atime * 1000;
    return moment(atime).tz(time_zone);
}

export const formatEpoch = (atime, format = 'M/D/YYYY h:mm a') => {
    if(!atime) return atime;
    return epochToMoment(atime).format(format);
}

export const objectToQueryString = (obj) => {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }

    return str;
}

export const getBackURL = () => {
    let url      = URI(window.location.href);
    let query    = url.search(true);
    let fragment = url.fragment();
    let backUrl  = query.hasOwnProperty('BackUrl') ? query['BackUrl'] : null;
    if(fragment != null && fragment != ''){
        backUrl += `#${fragment}`;
    }
    return backUrl;
}

/**
 *
 * Auth Utils
 */

export const getAccessToken = () => {
    if(typeof window !== 'undefined') {
        return window.accessToken;
    }
    return null;
}

export const getIdToken = () => {
    if(typeof window !== 'undefined') {
        return window.idToken;
    }
    return null;
}

export const getOAuth2ClientId = () => {
    if(typeof window !== 'undefined') {
        return window.OAUTH2_CLIENT_ID;
    }
    return null;
}

export const getOAuth2IDPBaseUrl = () => {
    if(typeof window !== 'undefined') {
        return window.IDP_BASE_URL;
    }
    return null;
}

export const getOAuth2Scopes = () => {
    if(typeof window !== 'undefined') {
        return window.SCOPES;
    }
    return null;
}

export const getAuthCallback = () => {
    if(typeof window !== 'undefined') {
        return `${window.location.origin}/auth/callback`;
    }
    return null;
}

export const getCurrentLocation = () => {
    let location = '';
    if(typeof window !== 'undefined') {
        location = window.location;
        // check if we are on iframe
        if (window.top)
            location = window.top.location;
    }
    return location;
}

export const getOrigin = () => {
    if(typeof window !== 'undefined') {
        return window.location.origin;
    }
    return null;
}

export const getCurrentPathName = () => {
    if(typeof window !== 'undefined') {
       return window.location.pathname;
    }
    return null;
}

export const getCurrentHref = () => {
    if(typeof window !== 'undefined') {
        return window.location.href;
    }
    return null;
}

export const getAllowedUserGroups = () => {
    if(typeof window !== 'undefined') {
        return window.ALLOWED_USER_GROUPS || '';
    }
    return null;
}

export const buildAPIBaseUrl = (relativeUrl) => {
    if(typeof window !== 'undefined'){
        return `${window.API_BASE_URL}${relativeUrl}`;
    }
    return null``;
}

export const storeAuthInfo = (accessToken, idToken, sessionState) => {
    if(typeof window !== 'undefined'){
        window.accessToken = accessToken;
        window.idToken = idToken;
        window.sessionState = sessionState;
        return;
    }
}

export const clearAuthInfo = () => {
    if(typeof window !== 'undefined'){
        window.accessToken = null;
        window.idToken = null;
        window.sessionState = null;
        return;
    }
}

export const putOnLocalStorage = (key, value) => {
    if(typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
    }
}

export const getFromLocalStorage = (key, removeIt) => {
    if(typeof window !== 'undefined') {
        let val = window.localStorage.getItem(key);
        if(removeIt){
            window.localStorage.removeItem(key);
        }
        return val;
    }
    return null;
}

export const isClearingSessionState = () => {
    if(typeof window !== 'undefined') {
        return window.clearing_session_state;
    }
    return false;
}

export const setSessionClearingState = (val) => {
    if(typeof window !== 'undefined') {
        window.clearing_session_state = val;
    }
}

export const getCurrentUserLanguage = () => {
    let language = 'en';
    if(typeof navigator !== 'undefined') {
        language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
    }
    return language;
}