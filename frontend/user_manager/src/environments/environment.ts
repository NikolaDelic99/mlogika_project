// This file can be replaced during build by using the
// `fileReplacements` array.

// `ng build` replaces `environment.ts` with `environment.prod.ts`.

// The list of file replacements can be found in `angular.json`.

export const environment = {

production: false,

protocol: 'http:',

host: '127.0.0.1:8080',//'localhost:8080'

root: 'api',

url: 'http://localhost:4200/#',

static: false,

modules: {

register: true,

register2: true,

accounts: true,

updateaccount: true,

contacts: true,

addcontact: true

}

}