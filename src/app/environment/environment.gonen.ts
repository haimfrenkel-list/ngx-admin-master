export const environment = {
    production: true,
    apiUrl: 'http://listwebsite-env-dev.us-east-2.elasticbeanstalk.com/',
    contactUs: 'izik@listfunding.com',
    calculationMode: true
};

// 
function init() {
   // environment.apiUrl = window.location.hostname == 'localhost' ? 'http://localhost:8080': 'http://listserver.us-east-2.elasticbeanstalk.com';
}

init();

