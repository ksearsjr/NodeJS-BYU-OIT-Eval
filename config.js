// Required information for the app to run.

config = {};
config.github = {
        "username": "", // Your GitHub username
        "password": "", // Your GitHub password
        "organization": "" // Your GitHub organization name
};
config.gmail = {
        "from_address": "" // The email address to use in the from field in the emails
};
config.AWS = {
        "aws_access_key_id": "", // Your AWS access key id
        "aws_secret_access_key": "", // Your aws secret access key
        "s3_bucket": "", // Your AWS S3 bucket name
        "s3_bucket_key": "" // Your AWS S3 bucket key name. It should create the key if it doesn't already exist. 
};

module.exports = config;

process.env.AWS_ACCESS_KEY_ID = config.AWS.aws_access_key_id;
process.env.AWS_SECRET_ACCESS_KEY = config.AWS.aws_secret_access_key;