# Python Skills Evaluation for BYU OIT Software Developer - AWS Position (Job ID 64987)

### Setup
Install Node.js if you don't already have it installed. 

`brew install node`

It was developed and tested on Node.js 8.4.0.

No additional libraries are required to be installed to run this code. I used other libraries but they should all be included with my code in the node_modules folder.

In order for the app to work, you should only need to put the required information in the config.py file. All values in that file are required.

When you first run the code, if it's required to send an email, it will provide you with a url which you will need to paste into your browser. When you execute the url it will ask you to authenticate with your own Gmail account and then it will return a key that will need to be copied and pasted into your terminal. It will then use your account to send the email through the Gmail API.

### How to run the app
Inside the directory where the code resides, run this in a terminal:

`node notify_nameless.py`

### Assumptions
This was developed on my Mac. I have not tested this on any other OS. Please let me know if you have trouble running it.

In order to send an email to an organization member, the member must have the public email field set inside the profile page. I couldn't figure out any other way to get the users email through the API.
