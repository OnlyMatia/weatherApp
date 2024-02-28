const apiKey = "229bb1238b115797a4f3a6ce03fb494a"
const searchBtn = document.getElementById("searchBtn") 
const cityError = document.getElementById("error-city")
const container = document.getElementById("container")
const resultDiv = document.getElementById("result")

const temp = document.getElementById("temp")
const cityName = document.getElementById("cityName")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const icon = document.getElementById("imgIcon")

const setData = (data) => {
    if(data.weather[0].main === "Clouds"){
        icon.setAttribute("src", "weather-icons/broken-clouds.jpg")
    }else if(data.weather[0].main === "Thunderstorm"){
        icon.setAttribute("src", "weather-icons/thunderstorm.jpg")
    }else if(data.weather[0].main === "Rain"){
        icon.setAttribute("src", "weather-icons/rain.jpg")
    }else if(data.weather[0].main === "Clear"){
        icon.setAttribute("src", "weather-icons/clear-day.jpg")
    }else if(data.weather[0].main === "Drizzle"){
        icon.setAttribute("src", "weather-icons/rain-night.jpg")
    }else if(data.weather[0].main === "Atmosphere"){
        icon.setAttribute("src", "weather-icons/mist.jpg")
    }

    temp.innerHTML = `${Math.round(data.main.temp)}<sup>o</sup>C`;
    cityName.innerText = data.name;
    humidity.innerText =`${data.main.humidity}%`
    wind.innerText = `${data.wind.speed}km/h`
}

const fetchURL = (city) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(res => res.json())

const isInputFieldFalse = () => {
    cityError.classList.remove("hide")
    resultDiv.classList.add("hide")
}

const isInputFieldTrue = () => {
    cityError.classList.add("hide")
    resultDiv.classList.remove("hide")
}

document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        getData()
    }
})

const getData = () => {
    const city = document.getElementById("cityInput").value
    icon.removeAttribute("src")

    if(!city.trim()){
        isInputFieldFalse()
    }else{
        fetchURL(city)
        .then((data) => {
            
        setData(data);
        isInputFieldTrue();
        })
        .catch(err => console.error("Error 404"))
    }
}

