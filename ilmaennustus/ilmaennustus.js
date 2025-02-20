// const url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.37&lon=24.59&altitude=90"
// var response = fetch()
// //console.log(response);
// console.log("Hello world!")

async function getData(){
    const url = "https://rickandmortyapi.com/api/character"
    // const url = "https://api.met.no/weatherapi/locationforecast/2.0/classic?lat=59.37&lon=24.59&altitude=90"
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status ${response.status}`);
        }

        console.log(response);
    }

    catch(error){
        console.error(error.message);
    }
}