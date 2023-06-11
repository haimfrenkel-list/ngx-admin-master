export const environment = {
    production: true,
    apiUrl: 'https://server.listfunding.com',
    contactUs: 'izik@listfunding.com',
    calculationMode: false
};

function init() {
   // environment.apiUrl = window.location.hostname == 'localhost' ? 'http://localhost:8080': 'http://listserver.us-east-2.elasticbeanstalk.com';
}

init();

