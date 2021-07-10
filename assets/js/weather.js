// weather types: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2


weatherInformation = [
    // "id" - unique weather scenario
    // "main" - type of weather group
    // "description" - der
    // "icon" - url link to the icon
    // || MY CUSTOM ADDITION
    // parallax url link for type - image must be greater than 800px wide
        // get this from a google search of the description

        // thunderstorm
        {id: 200, main: "Thunderstorm", description: 'thunderstorm with light rain',    day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 201, main: "Thunderstorm", description: 'thunderstorm with rain',          day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 202, main: "Thunderstorm", description: 'thunderstorm with heavy rain',    day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 210, main: "Thunderstorm", description: 'light thunderstorm',              day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 211, main: "Thunderstorm", description: 'thunderstorm',                    day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 212, main: "Thunderstorm", description: 'heavy thunderstorm',              day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 221, main: "Thunderstorm", description: 'ragged thunderstorm',             day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 230, main: "Thunderstorm", description: 'thunderstorm with light drizzle', day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 231, main: "Thunderstorm", description: 'thunderstorm with drizzle',       day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        {id: 232, main: "Thunderstorm", description: 'thunderstorm with heavy drizzle', day_icon:'https://openweathermap.org/img/wn/11d@2x.png', night_icon:'https://openweathermap.org/img/wn/11d@2x.png', parallax_url: "https://www.bestservices.co.uk/wp-content/uploads/2017/11/shutterstock_281493026-2-2560x850.jpg"},
        // drizzle
        {id: 300, main: "Drizzle", description: 'light intensity drizzle',              day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 301, main: "Drizzle", description: 'drizzle',                              day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 302, main: "Drizzle", description: 'heavy intensity drizzle',              day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 310, main: "Drizzle", description: 'light intensity drizzle rain',         day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 311, main: "Drizzle", description: 'drizzle rain',                         day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 312, main: "Drizzle", description: 'heavy intensity drizzle rain',         day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 313, main: "Drizzle", description: 'shower rain and drizzle',              day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 314, main: "Drizzle", description: 'heavy shower rain and drizzle',        day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 321, main: "Drizzle", description: 'shower drizzle',                       day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://images.unsplash.com/photo-1556485689-33e55ab56127?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJpenpsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"},
        // Rain
        {id: 500, main: "Rain", description: 'light rain',                              day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 501, main: "Rain", description: 'moderate rain',                           day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 502, main: "Rain", description: 'heavy intensity rain',                    day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 503, main: "Rain", description: 'very heavy rain',                         day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 504, main: "Rain", description: 'extreme rain',                            day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 511, main: "Rain", description: 'freezing rain',                           day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 520, main: "Rain", description: 'light intensity shower rain',             day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 521, main: "Rain", description: 'shower rain',                             day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 522, main: "Rain", description: 'heavy intensity shower rain',             day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        {id: 531, main: "Rain", description: 'ragged shower rain',                      day_icon:'https://openweathermap.org/img/wn/09d@2x.png', night_icon:'https://openweathermap.org/img/wn/09d@2x.png', parallax_url: "https://www.rd.com/wp-content/uploads/2016/09/03-not-weird-facts-rain-Mr_Twister.jpg"},
        // snow
        {id: 600, main: "Snow", description: 'light snow',                              day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 601, main: "Snow", description: 'snow',                                    day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 602, main: "Snow", description: 'Heavy snow',                              day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 611, main: "Snow", description: 'Sleet',                                   day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 612, main: "Snow", description: 'Light shower sleet',                      day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 613, main: "Snow", description: 'Shower sleet',                            day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 615, main: "Snow", description: 'Light rain and snow',                     day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 616, main: "Snow", description: 'Rain and snow',                           day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 620, main: "Snow", description: 'Light shower snow',                       day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 621, main: "Snow", description: 'Shower snow',                             day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        {id: 622, main: "Snow", description: 'Heavy shower snow',                       day_icon:'https://openweathermap.org/img/wn/13d@2x.png', night_icon:'https://openweathermap.org/img/wn/13d@2x.png', parallax_url: "https://nypost.com/wp-content/uploads/sites/2/2020/12/111518_NYC_November_snow_stormPM_3.jpg?quality=80&strip=all&w=1024"},
        // atmosphere
        {id: 701, main: "Mist", description: 'Mist',                                    day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://www.zocalopublicsquare.org/wp-content/uploads/2010/05/mist.jpg"},
        {id: 711, main: "Smoke", description: 'Smoke',                                  day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://live-production.wcms.abc-cdn.net.au/f5f7516de6e8d3888ebf0b68e899438a?impolicy=wcms_crop_resize&cropH=1357&cropW=2042&xPos=0&yPos=0&width=862&height=575"},
        {id: 721, main: "Haze", description: 'Haze',                                    day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://images.thewest.com.au/publication/B881858048Z/1619579905416_GPT38FSRT.1-2.jpg?imwidth=810&impolicy=wan_v3"},
        {id: 731, main: "Dust", description: 'sand/dust whirls',                        day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_04/3198636/200123-dustcloud-australia-mc-1127.JPG"},
        {id: 741, main: "Fog", description: 'Fog',                                      day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://content.api.news/v3/images/bin/4c5b045a7784a27ee39860442b54b94a"},
        {id: 751, main: "Sand", description: 'Sand',                                    day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://t4.ftcdn.net/jpg/03/56/91/03/360_F_356910373_lP50O72Jl7S9T4bdbVEmuJZMQWWs0z5b.jpg"},
        {id: 761, main: "Dust", description: 'Dust',                                    day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_04/3198636/200123-dustcloud-australia-mc-1127.JPG"},
        {id: 762, main: "Ash", description: 'Volcanic ash',                             day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://d3nuqriibqh3vw.cloudfront.net/images/inquirer.jpg"},
        {id: 771, main: "Squall", description: 'Squalls',                               day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://www.clubmarine.com.au/articleimages/31-3-Watch-the-weather/$FILE/Watch-the-weather-image1-hero-sm.jpg"},
        {id: 781, main: "Tornado", description: 'Tornado',                              day_icon:'https://openweathermap.org/img/wn/50d@2x.png', night_icon:'https://openweathermap.org/img/wn/50d@2x.png', parallax_url: "https://thumbs-prod.si-cdn.com/wIrZprGj4C-A0EIC6uysJToapeo=/fit-in/1600x0/https://public-media.si-cdn.com/filer/1d/37/1d37df99-52cb-48a9-a322-df4b0bfd3f4b/hyamy0.jpg"},
        // clear
        {id: 800, main: "Clear", description: 'clear sky',                              day_icon:'https://openweathermap.org/img/wn/10d@2x.png', night_icon:'https://openweathermap.org/img/wn/10n@2x.png', parallax_url: "https://bitcoinist.com/wp-content/uploads/2019/07/10th-July-8.jpg"},
        // clouds
        {id: 801, main: "Clouds", description: 'few clouds: 11-25%',                    day_icon:'https://openweathermap.org/img/wn/02d@2x.png', night_icon:'https://openweathermap.org/img/wn/02n@2x.png', parallax_url: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 802, main: "Clouds", description: 'scattered clouds: 25-50%',              day_icon:'https://openweathermap.org/img/wn/03d@2x.png', night_icon:'https://openweathermap.org/img/wn/03n@2x.png', parallax_url: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 803, main: "Clouds", description: 'broken clouds: 51-84%',                 day_icon:'https://openweathermap.org/img/wn/04d@2x.png', night_icon:'https://openweathermap.org/img/wn/04n@2x.png', parallax_url: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"},
        {id: 804, main: "Clouds", description: 'overcast clouds: 85-100%',              day_icon:'https://openweathermap.org/img/wn/04d@2x.png', night_icon:'https://openweathermap.org/img/wn/04n@2x.png', parallax_url: "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"},
]

function getWeatherDetail(id){
    for(let i =0; i < weatherInformation.length; i++){
        if(weatherInformation[i].id === id){
            let weatherDetail = weatherInformation[i];
            return weatherDetail;
        }
    }
}


