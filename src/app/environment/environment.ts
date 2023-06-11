export const environment = {
    production: true,
//    apiUrl: 'http://3.16.114.108:5001',
//    apiUrl: 'http://18.220.90.119:5001',
//    apiUrl: 'http://localhost:5001',
    //  apiUrl: 'https://qa.server.listfunding.com',
    apiUrl: 'Workflowqa-env.eba-cpqtzhpj.us-east-2.elasticbeanstalk.com',
    contactUs: 'izik@listfunding.com',
    calculationMode: false
};   

function init() {
    environment.apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5001' : 'https://workflow.server.listfunding.com';
    // environment.apiUrl = window.location.hostname === 'localhost' ? 'http://34.135.129.201:5001' : 'http://34.135.129.201:5001';

    // environment.apiUrl = 'https://aportoa.server.listfunding.com'
    // environment.apiUrl =  'https://qa.server.listfunding.com';
    // environment.apiUrl =  'https://listfunding.ew.r.appspot.com';
}

init();

  