'use strict';

const config = require('./config.js');
const GitHub = require('./github.js');
const Gmail = require('./gmail.js')
const AWS = require('aws-sdk');

function createMessage(sendTo) {
    var message;

    message = `To: ${sendTo}\r\n`;
    message += `From: ${config.gmail.from_address}\r\n` 
    message += `Subject: Nameless ${config.github.organization} member\r\n\r\n`
    message += `Nameless Member,\n\n`
    message += `We don't know what to call you. `
    message += `Please go to the link provided and take a moment to update your GitHub profile to include your name.\n\n`
    message += `https://github.com/settings/profile\n\n`
    message += `Thank You,\n`
    message += `Your friendly administrator`
    return message;
}

function uploadNamelessToS3(fileContents) {
    const s3 = new AWS.S3();
    var params = {Bucket: config.AWS.s3_bucket, Key: config.AWS.s3_bucket_key, Body: fileContents, ContentType: 'application/json'};
    s3.upload(params, function(err, data) {
      //console.log(err, data);
      console.log("Done uploading to S3");
    });
}

function main() {
    if (!config.github.username) {
        console.log("Error: Please enter the required information in config.py")
        return
    }

    // Get all members of the organization and add them to
    // namelessMembers if they don't have a name
    console.log("Gathering nameless members...");
    var namelessMembers = [];
    const github = new GitHub();
    github.getOrgMembers(config.github.organization).then(function(members) {
        const userPromises = members.map(function(member) { return github.getUser(member.login) } );
        Promise.all(userPromises).then(function(users) {
            
            const gmail = new Gmail();
            
            console.log("Emailing nameless members...");
            users.forEach(function(user) {
                if (!user.name) {
                    namelessMembers.push(user);
                
                    if (user.email) {
                        console.log(`${user.login}: ${user.email}`);
                        // Authorize a client with the loaded credentials, 
                        // then call sendEmail with the authorization.
                        gmail.authorize(auth => {
                            gmail.sendMail(auth, createMessage(user.email));
                        });
                    } else {
                        console.log(`${user.login}: No Email`);    
                    }
                }
            })
            console.log(namelessMembers);
            console.log("Uploading nameless member info to s3...");
            uploadNamelessToS3(JSON.stringify(namelessMembers, null, 4));
        })
    });
}

main();