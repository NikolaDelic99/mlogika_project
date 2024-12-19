// This file can be replaced during build by using the
// `fileReplacements` array.

// `ng build` replaces `environment.ts` with `environment.prod.ts`.

// The list of file replacements can be found in `angular.json`.

export const environment = {

production: true,

protocol: window.location.protocol,

host: window.location.host,

root: 'mlogika_spring/api',

url: window.location.protocol+'//'+window.location.host+'/mlogika_spring/#',

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