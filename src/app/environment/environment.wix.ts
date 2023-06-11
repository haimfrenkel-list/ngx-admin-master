export const environment = {
    production: true,
   // apiUrl: 'http://localhost:8080',
    //  apiUrl: 'https://api.server.listfunding.com',
     apiUrl: 'https://qa.server.listfunding.com',
    contactUs: 'izik@listfunding.com',
    calculationMode: false
};

function init() {
    environment.apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080' : 'https://api.server.listfunding.com';
}

// init();
