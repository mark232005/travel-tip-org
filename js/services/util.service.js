export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    getRandomIntInclusive,
    randomPastTime,
    getRandomLatLng,
    elapsedTime,
    getColors,
    updateQueryParams,
    getDistance
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function getRandomInRange(from = -180, to = 180, fixed = 3) {
    return +(Math.random() * (to - from) + from).toFixed(fixed)
}

function getRandomLatLng() {
    return { lat: getRandomInRange(), lng: getRandomInRange() }
}

function elapsedTime(pastMs) {
    const now = new Date()
    const secondsPast = Math.round((now - pastMs) / 1000)

    if (secondsPast < 60 * 5) return `just now` 
    
    const minutesPast = Math.floor(secondsPast / 60)
    if (minutesPast < 60) return `last hour` 

    const hoursPast = Math.floor(minutesPast / 60)
    if (hoursPast < 24)  return `today` 

    return `${Math.floor(hoursPast / 24)} days ago`

}

function updateQueryParams(queryParamsObj) {
    var queryParams = `?`
    for (let paramName in queryParamsObj){
        if (queryParamsObj[paramName] !== undefined) {
            queryParams += `${paramName}=${queryParamsObj[paramName]}&`
        }
    }
    queryParams = queryParams.substring(0, queryParams.length-1)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function getColors() {
    return ['#F44336',
    '#FFEBEE',
    // '#FFCDD2',
    '#EF9A9A',
    '#E57373',
    '#EF5350',
    '#F44336',
    '#E53935',
    '#D32F2F',
    '#C62828']    
}

function getDistance(latLng1, latLng2, unit) {
    if ((latLng1.lat == latLng2.lat) && (latLng1.lng == latLng2.lng)) {
        return 0
    }
    else {
        var radlat1 = Math.PI * latLng1.lat / 180
        var radlat2 = Math.PI * latLng2.lat / 180
        var theta = latLng1.lng - latLng2.lng
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) {
            dist = 1
        }
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit === 'K') { dist = dist * 1.609344 }
        if (unit === 'N') { dist = dist * 0.8684 }

        dist = +dist.toFixed(2)
        return dist
    }
}