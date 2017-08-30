'use strict';

const config = require('./config.js');
const http = require('http');
var request = require('request-promise');

module.exports = class GitHub {
    constructor() {
        this.host = 'https://api.github.com';
        const auth = Buffer.from(config.github.username + ":" + config.github.password).toString('base64');
        this.header = {'User-Agent': config.github.username, 'Authorization': 'Basic ' + auth};
    }

    getOrgMembers(orgName) {
        const uri = this.host + `/orgs/${orgName}/members`;
        
        const options = {
            'uri': uri,
            'method': 'GET',
            'json': true,
            'headers': this.header
        };

        return request(options);
    }    

    getUser(loginName) {
        const uri = this.host + `/users/${loginName}`;
        
        const options = {
            'uri': uri,
            'method': 'GET',
            'json': true,
            'headers': this.header
        };

        return request(options);
    }
}