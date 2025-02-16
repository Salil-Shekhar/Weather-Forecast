const apikey = "93a66b105096c225cf87e1d7763ed2c8";
const searchbox = document.querySelector('.text');
const button = document.querySelector('.btn');
const weatherIcon=document.querySelector('.bot');

async function checkweather(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`;
    
    try {
        const response = await fetch(apiurl);
        
        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();
        console.log(data);
        
        // Update the HTML with the weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".pat").innerHTML = data.main.humidity + "%";
        document.querySelector(".hellobot").innerHTML = data.wind.speed + " km/hr";
		if(data.weather[0].main=="Clouds"){
			weatherIcon.src="weather/cloud.png";
		}
		else if(data.weather[0].main=="Clear"){
			weatherIcon.src="weather/clear.png";
		}
		else if(data.weather[0].main=="Rain"){
			weatherIcon.src="weather/rain.png";
		}
		else if(data.weather[0].main=="Drizzle"){
			weatherIcon.src="weather/snow.png";
		}
		else if(data.weather[0].main=="Mist"){
			weatherIcon.src="weather/mist.png";
		}
    } catch (error) {
        console.error(error);
        // Optionally, you can display an error message to the user
        document.querySelector(".city").innerHTML = "Error: " + error.message;
    }
}

button.addEventListener("click", () => {
    const city = searchbox.value; // Get the city from the search box
    checkweather(city);
});