let cities = [
    // "الباحة", "الرياض", "الشرقية", "مكة المكرمة", "المدينة المنورة"
    {
        arabicName : "الباحة",
        name : "Al Bāḩah"
    },
    {
        arabicName : "الرياض",
        name : "Ar Riyāḑ"
    },
    {
        arabicName : "الشرقية",
        name : "Ash Sharqīyah"
    },
    {
        arabicName : "مكة المكرمة",
        name : "Makkah al Mukarramah"
    },
    {
        arabicName : "المدينة المنورة",
        name : "Al Madīnah al Munawwarah"
    },
    {
        arabicName : "جازان",
        name : "Jāzān"
    }
    
]
for(let city of cities){
    const content = `
        <option>${city.arabicName}</option>
    `
    document.getElementById("cities-select").innerHTML += content
}
document.getElementById("cities-select").addEventListener("change", function () {
    
    document.getElementById("CityNameID").innerHTML = this.value
    let cityName = "";

    for(let city of cities){
        if(city.arabicName == this.value){
            cityName = city.name;
        }
    }
    getParayersTimingOfCity(cityName)
})


function getParayersTimingOfCity(CityName){
    let params = {
        country : "SA",
        city : CityName //"Makkah al Mukarramah"
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
      })
      .then(function (response) {
        const timings = response.data.data.timings
        fillTimeForPrayer("fajr-time", timings.Fajr)
        fillTimeForPrayer("sunrise-time", timings.Sunrise)
        fillTimeForPrayer("dhuhrh-time", timings.Dhuhr)
        fillTimeForPrayer("asr-time", timings.Asr)
        fillTimeForPrayer("sunset-time", timings.Sunset)
        fillTimeForPrayer("isha-time", timings.Isha)
    
        const readableDate = response.data.data.date.readable
        const weekday = response.data.data.date.hijri.weekday.ar
        const date = weekday + " " + readableDate
    
        document.getElementById("dateID").innerHTML = date
    
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
}
getParayersTimingOfCity("Al Bāḩah")


function fillTimeForPrayer(id, time){
    document.getElementById(id).innerHTML = time
}
