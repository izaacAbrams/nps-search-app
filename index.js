

const apiKey = "8YITBrUjTOkkDOAjhyYQDOJ0oaeeLlFMkRqDHn4c";
const url = "https://developer.nps.gov/api/v1/parks";

function getParkData(stateSearch, maxValue) {
    const params = {
        api_key: apiKey,
        stateCode: stateSearch,
        limit: maxValue,
        fields: "addresses"
    }
    const queryString = formatParams(params);
    const fullUrl = url + '?' + queryString;
    console.log(fullUrl);

    fetch(fullUrl)
        .then(response => {
            if (response.ok){
                return response.json();
            }throw new Error(response.statusText);
        })
        .then(responseJson => showResults(responseJson))
        .catch(error => {
            $('#error-message').text(`Something went wrong: ${error.message}`)
        });
}
function showResults(responseJson){
    console.log(responseJson);
    $('.results').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('.results').append(
            `<li><h2 class="result-title">${responseJson.data[i].fullName}</h2>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            <a href="${responseJson.data[i].directionsUrl}">Directions</a></p>
            <p>${responseJson.data[i].addresses[0].type}: ${responseJson.data[i].addresses[0].line1},
            ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode}</p>
            <p>${responseJson.data[i].addresses[1].type}: ${responseJson.data[i].addresses[1].line1},
            ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode}</p></li>`
        );
    }
    $('.results-page').removeClass('hidden')
}

function formatParams(params) {
    const query = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return query.join('&');
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const stateSearch = $('.state-lookup').val().split(' ');
        const maxValue = $('#max-num').val();
        getParkData(stateSearch, maxValue);
    })
}

$(watchForm);