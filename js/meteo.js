

const meteoForm = document.forms['meteoForm']

// FUNCION PARA TRANSFORMAR EL UNIXTIME EN TIMESTAMP
function formatUnixTime(timestamp) {
    const date = new Date(timestamp * 1000); // Multiplicamos por 1000 para convertir a milisegundos
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

meteoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let city = meteoForm['city'].value.trim()
    console.log(city)

    const units = 'metric'
    let lang = meteoForm['lang'].value.trim()
    const appid = '7b42076a65f2201a2b312c2d158874ac'
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${lang}&appid=${appid}`

    console.log(URL)

    fetch(URL)
    .then(data => data.json())
    .then(data => {
        console.log(data['name'])
        console.log(data['weather'][0]['description'])
        const description = `${data['weather'][0]['description']}`
        const icon = `${data['weather'][0]['icon']}`
        document.getElementById('iconNow').innerHTML = `<img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}">`
        document.getElementById('description').innerHTML = `<span> ${description}</span>`
        const temp = `${data['main']['temp']}`
        document.getElementById('temp').innerHTML = `Temp: ${temp}ºC`
        const feels_like = `${data['main']['feels_like']}`
        document.getElementById('feels_like').innerHTML = `Sens: ${feels_like}ºC`
        const temp_min = `${data['main']['temp_min']}`
        document.getElementById('temp_min').innerHTML = `T. min: ${temp_min}ºC`
        const temp_max = `${data['main']['temp_max']}`
        document.getElementById('temp_max').innerHTML = `T. max: ${temp_max}ºC`
        const humidity = `${data['main']['humidity']}`
        document.getElementById('humidity').innerHTML = `Hum: ${humidity} %`
        const speed = `${data['wind']['speed']}`
        document.getElementById('speed').innerHTML = `Vel: ${speed} km/h`
        const sunrise = formatUnixTime(data['sys']['sunrise'])
        document.getElementById('sunrise').innerHTML = `Amanecer: ${sunrise}`
        const sunset = formatUnixTime(data['sys']['sunset'])
        document.getElementById('sunset').innerHTML = `Atardecer: ${sunset}`
    
    
    })
    .catch(error => console.log(error))
})





