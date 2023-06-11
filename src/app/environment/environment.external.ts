export const environment = {
    production: true,
    apiUrl: 'https://external.server.listfunding.com',
    contactUs: 'izik@listfunding.com',
    calculationMode: false
};

// listwebsite-env-dev.us-east-2.elasticbeanstalk.com
function init() {
   // environment.apiUrl = window.location.hostname == 'localhost' ? 'http://localhost:8080': 'http://listserver.us-east-2.elasticbeanstalk.com';
}

init();

