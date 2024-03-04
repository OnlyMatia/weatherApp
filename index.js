const apiKey = "229bb1238b115797a4f3a6ce03fb494a"
const searchBtn = document.getElementById("searchBtn") 
const cityError = document.getElementById("error-city")
const container = document.getElementById("container")
const resultDiv = document.getElementById("result")
const icon = document.getElementById("imgIcon")
const temp = document.getElementById("temp")
const cityName = document.getElementById("cityName")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")


const setData = (data) => {
    icon.setAttribute("src", "weather-icons/"+data.weather[0].main+".png")
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
        .catch(err => alert("Enter a valid country"))
    }
}

