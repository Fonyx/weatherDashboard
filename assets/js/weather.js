// weather types: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// https://www.pexels.com/search/weather/
clouds_path = "https://www.pexels.com/photo/beautiful-clouds-cloudy-dramatic-209831/"

icon_root = "http://openweathermap.org/img/wn/xxd@2x.png"


let weatherDetails = [
    // "id" - unique weather scenario
    // "main" - type of weather group
    // "description" - der
    // "icon" - url link to the icon
    // || MY CUSTOM ADDITION
    // parallax url link for type - image must be greater than 800px wide
        // get this from a google search of the description

        // thunderstorm
        {id: 200, main: "Thunderstorm", description: 'thunderstorm with light rain', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 201, main: "Thunderstorm", description: 'thunderstorm with rain', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 202, main: "Thunderstorm", description: 'thunderstorm with heavy rain', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 210, main: "Thunderstorm", description: 'light thunderstorm', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 211, main: "Thunderstorm", description: 'thunderstorm', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 212, main: "Thunderstorm", description: 'heavy thunderstorm', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 221, main: "Thunderstorm", description: 'ragged thunderstorm', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 230, main: "Thunderstorm", description: 'thunderstorm with light drizzle', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 231, main: "Thunderstorm", description: 'thunderstorm with drizzle', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        {id: 232, main: "Thunderstorm", description: 'thunderstorm with heavy drizzle', day_icon:'http://openweathermap.org/img/wn/11d@2x.png', night_icon:'http://openweathermap.org/img/wn/11d@2x.png', parallax_url: ""},
        // drizzle
        {id: 300, main: "Drizzle", description: 'light intensity drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 301, main: "Drizzle", description: 'drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 302, main: "Drizzle", description: 'heavy intensity drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 310, main: "Drizzle", description: 'light intensity drizzle rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 311, main: "Drizzle", description: 'drizzle rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 312, main: "Drizzle", description: 'heavy intensity drizzle rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 313, main: "Drizzle", description: 'shower rain and drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 314, main: "Drizzle", description: 'heavy shower rain and drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 321, main: "Drizzle", description: 'shower drizzle', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        // Rain
        {id: 500, main: "Rain", description: 'light rain', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10d@2x.png', parallax_url: ""},
        {id: 501, main: "Rain", description: 'moderate rain', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10d@2x.png', parallax_url: ""},
        {id: 502, main: "Rain", description: 'heavy intensity rain', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10d@2x.png', parallax_url: ""},
        {id: 503, main: "Rain", description: 'very heavy rain', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10d@2x.png', parallax_url: ""},
        {id: 504, main: "Rain", description: 'extreme rain', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10d@2x.png', parallax_url: ""},
        {id: 511, main: "Rain", description: 'freezing rain', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 520, main: "Rain", description: 'light intensity shower rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 521, main: "Rain", description: 'shower rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 522, main: "Rain", description: 'heavy intensity shower rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        {id: 531, main: "Rain", description: 'ragged shower rain', day_icon:'http://openweathermap.org/img/wn/09d@2x.png', night_icon:'http://openweathermap.org/img/wn/09d@2x.png', parallax_url: ""},
        // snow
        {id: 600, main: "Snow", description: 'light snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 601, main: "Snow", description: 'snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 602, main: "Snow", description: 'Heavy snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 611, main: "Snow", description: 'Sleet', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 612, main: "Snow", description: 'Light shower sleet', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 613, main: "Snow", description: 'Shower sleet', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 615, main: "Snow", description: 'Light rain and snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 616, main: "Snow", description: 'Rain and snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 620, main: "Snow", description: 'Light shower snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 621, main: "Snow", description: 'Shower snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},
        {id: 622, main: "Snow", description: 'Heavy shower snow', day_icon:'http://openweathermap.org/img/wn/13d@2x.png', night_icon:'http://openweathermap.org/img/wn/13d@2x.png', parallax_url: ""},

        // atmosphere
        {id: 701, main: "Mist", description: 'Mist', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 711, main: "Smoke", description: 'Smoke', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 721, main: "Haze", description: 'Haze', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 731, main: "Dust", description: 'Dust', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 741, main: "Fog", description: 'Fog', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 751, main: "Sand", description: 'Sand', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 761, main: "Dust", description: 'Dust', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 762, main: "Ash", description: 'Ash', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 771, main: "Squall", description: 'Squall', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},
        {id: 781, main: "Tornado", description: 'Tornado', day_icon:'http://openweathermap.org/img/wn/50d@2x.png', night_icon:'http://openweathermap.org/img/wn/50d@2x.png', parallax_url: ""},

        // clear
        {id: 800, main: "Clear", description: 'clear sky', day_icon:'http://openweathermap.org/img/wn/10d@2x.png', night_icon:'http://openweathermap.org/img/wn/10n@2x.png', parallax_url: ""},

        // clouds
        {id: 801, main: "Clouds", description: 'few clouds: 11-25%', day_icon:'http://openweathermap.org/img/wn/02d@2x.png', night_icon:'http://openweathermap.org/img/wn/02n@2x.png', parallax_url: ""},
        {id: 802, main: "Clouds", description: 'scattered clouds: 25-50%', day_icon:'http://openweathermap.org/img/wn/03d@2x.png', night_icon:'http://openweathermap.org/img/wn/03n@2x.png', parallax_url: ""},
        {id: 803, main: "Clouds", description: 'broken clouds: 51-84%', day_icon:'http://openweathermap.org/img/wn/04d@2x.png', night_icon:'http://openweathermap.org/img/wn/04n@2x.png', parallax_url: ""},
        {id: 804, main: "Clouds", description: 'overcast clouds: 85-100%', day_icon:'http://openweathermap.org/img/wn/04d@2x.png', night_icon:'http://openweathermap.org/img/wn/04n@2x.png', parallax_url: ""},
]

