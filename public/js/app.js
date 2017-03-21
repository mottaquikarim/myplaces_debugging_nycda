(function() {

    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            }; 
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            }; 
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    GET('/user/1/location').then((data) => {
        console.log(data);
    });

    document.querySelector('.js-submit').addEventListener('click', (e) => {

        const lat = parseFloat(document.querySelector('.js-lat').value, 10);
        const lng = parseFloat(document.querySelector('.js-lng').value, 10);

        console.log(lat, lng);

        POST('/api/user/1/location', {
            lat,
            lng,
        }).then((data) => {
            console.log(data);
        });
    });
})();
