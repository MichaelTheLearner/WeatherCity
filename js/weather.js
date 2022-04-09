const navTemp = document.querySelector('#navTemp')
const navWeatherIcon = document.querySelector("#navWeatherIcon")
const giantIcon = document.querySelector("#giantIcon")
const mainDes = document.querySelector("#weatherDescription");
const mainTemp = document.querySelector("#temp")

const convertCtoF = (cTemp) => {
    return `${(cTemp * 9/5) + 32} &#8457;`
}

const convertStringToIcon = (str) => {
    switch(str.toLowerCase()){
        case "sunny":
            return '<i style="color: yellow;" class="bi bi-sun-fill"></i>'
            break;
        case "partly cloudy":
            return '<i class="bi bi-cloud-sun"></i>'
            break;
        case "rain":
        case "light rain":
            return '<i class="bi bi-cloud-rain"></i>';
            break;
        case "light snow, mist":            
        case "light snow":
        case "snow":
            return '<i class="bi bi-cloud-snow"></i>';
            break;
        default:
            console.log(`string not found. add ${str.toLowerCase()} to the case`)
            break;
    }
}

const storeWeatherData = (locationName, weatherObj ) => {
    // localStorage.removeItem('WeatherApp');
    localStorage.setItem('WeatherApp', JSON.stringify({ LocationName: locationName }));
}

const populateHtml = (locationName) => {
    fetch(`https://goweather.herokuapp.com/weather/${locationName}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        storeWeatherData(location, data);
        // console.log(data["description"])
        navTemp.innerHTML = convertCtoF(parseInt(data["temperature"]));
        mainTemp.innerHTML = convertCtoF(parseInt(data["temperature"]));
        navWeatherIcon.innerHTML = convertStringToIcon(data["description"]);
        mainDes.innerText = data["description"];
        giantIcon.innerHTML = convertStringToIcon(data["description"]);
        document.querySelector('#mainDisplay').classList.remove('hidden')
    })
    .catch(err => {
        console.log(`error: ${err}`);
    });
}


const Weather = () => {
    const location = document.querySelector('#locationInput').value.trim()  
    

    populateHtml(location);
}
const getWeatherData = () => {
        return JSON.parse(localStorage.getItem('WeatherApp'))
}

let currentWeatherObj = (getWeatherData() !== null) ?  getWeatherData() : "";
console.log(currentWeatherObj)

document.querySelector("#weatherAddBtn").addEventListener('click', Weather);