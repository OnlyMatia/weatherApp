const apiKey = "229bb1238b115797a4f3a6ce03fb494a"
const searchBtn = document.getElementById("searchBtn") 
const cityError = document.getElementById("error-city")



const fetchURL = (city) => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(res => res.json())


document.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        getData()
    }
})

const getData = () => {
    const city = document.getElementById("cityInput").value

    if(!city.trim()){
        cityError.classList.remove("hide")
    }else{
        cityError.classList.add("hide")

        fetchURL(city)
        .then((data) => {
        //temp
        console.log(Math.round(data.main.temp));
        //wind speed
        console.log(data.wind.speed);
        //weather icon
        console.log(data.weather[0].main);
        //main code for app


        //https://openweathermap.org/weather-conditions   - weather icons


        })
        .catch(err => console.error("Error 404"))
    }
}

