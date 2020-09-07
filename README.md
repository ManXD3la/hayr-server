# hayr-server
# MyClientele API


### Usage
Base Url: https://shielded-badlands-61965.herokuapp.com/api
| Endpoint    | Method | Description                                                                                           |
| ----------- | ------- | ----------------------------------------------------------------------------------------------------- |
| /auth/login       | post     | Comapres auth token sent to existing accounts,returns comfirmation                    |
| /user/       | post     | Takes registration info , then creates both a new account for a user|
| /user/:user_name       | get     | Gets user information for user (name, user name, email)|
| /user/:user_name       | delete     | Deletes user account.  Must be logged in as user to delete |
| /entry       | post     | Takes entry information, inserts in to database and returns the entry information in an object                    |
| /entry       | get     | Gets all entries for associated with user, returns entries an object                    |
| /entry/public       | get     | Gets most 30 publicly shared entries, returns entries as an object                    |
| /entry/:entryId       | get     | Takes entry id as a path parameter, returns entry information as an object                    |
| /entry/:entryId/community       | get     | Takes entry id as a path parameter, removes entry from database                    |
| /entry/:entryId       | delete     | Takes entry id as a path parameter, removes                    |

### POST `/auth/login`
Parameters:  
none 

Returns:   
'ok'

### POST `/user`
Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;[ "name":"Irma" ],  
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-Frothman",  
&nbsp;&nbsp;&nbsp;&nbsp;"password":"P947fheh(*",   
&nbsp;&nbsp;&nbsp;&nbsp;"email":"IrmaJS@f5ftw.com",    
}  
**name** *string*  
**user_name** *string*  
**password** *string* Must be between 8 and 72 characters, must include one upper case, one lower case, one number and one special character
**email** *string*  
  
Returns:   
{     
&nbsp;&nbsp;&nbsp;&nbsp;"id":35,   
&nbsp;&nbsp;&nbsp;&nbsp;"name":"Irma",   
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-Frothman",  
&nbsp;&nbsp;&nbsp;&nbsp;"email":"IrmaJS@f5ftw.com",   
}  

### GET `/user/:user_name`
Parameters:  
None  
  
Returns:   
{     
&nbsp;&nbsp;&nbsp;&nbsp;"id":35,   
&nbsp;&nbsp;&nbsp;&nbsp;"name":"Irma",   
&nbsp;&nbsp;&nbsp;&nbsp;"user_name":"Irma-Frothman",  
&nbsp;&nbsp;&nbsp;&nbsp;"email":"IrmaJS@f5ftw.com",   
&nbsp;&nbsp;&nbsp;&nbsp;"admin_y":false,
}  

### DELETE `/user/:user_name`
Parameters:  
None  
  
Returns:
none
  
### POST `/entry`
Request Body Parameters:  
{  
&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"240",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"230",  
}  
  
**refleciton** *integer*  
**mood_pleasant***integer* Format: 0-255 with Starting with Sunday  
**mood_energy***integer* Format: 0-255 with Starting with Sunday  

  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "53"  
&nbsp;&nbsp;&nbsp;&nbsp;"id_user": "35",  
&nbsp;&nbsp;&nbsp;&nbsp;"date_created": "2020-07-23 23:16:45",  
&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"240",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"230",  
&nbsp;&nbsp;&nbsp;&nbsp;"entry_share": "private"  
}  

### GET `/entry/public`
Parameters:  
none  

Returns:   
[
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "53"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"240",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"230",  
&nbsp;&nbsp;},  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "57"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, is this what every day is like? Every week can't be like this. Good thing I found the closest beach!",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"245",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"223",  
&nbsp;&nbsp;},  
]    


### GET `/entry/:entryId`
Parameters:  
None  
  
Returns:   
{  
&nbsp;&nbsp;&nbsp;&nbsp;"id": "53"  
&nbsp;&nbsp;&nbsp;&nbsp;"id_user": "35",  
&nbsp;&nbsp;&nbsp;&nbsp;"date_created": "2020-07-23 23:16:45",  
&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"240",  
&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"230",  
&nbsp;&nbsp;&nbsp;&nbsp;"entry_share": "private"  
}  

### GET `/entry/:entryId/community`
Parameters:  
none  

Returns:   
[
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "53"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, so first day was a long day. Truly can see I''ll be using this more often than I thought LOL Is the weekend here yet?",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"240",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"230",  
&nbsp;&nbsp;},  
&nbsp;&nbsp;{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id": "57"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"reflection":"Okay, is this what every day is like? Every week can't be like this. Good thing I found the closest beach!",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_pleasant":"245",  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mood_energy":"223",  
&nbsp;&nbsp;},  
]    

### DELETE `/entry/:entryId`
Parameters:  
None  
  
Response:   
None

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests in watch mode `npm test`

Run the migrations up: `npm run migrate` , down: `npm run migrate --0`

## Deploying

When your new project is ready for deployment, add a new heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.


## MyClientele - Client

This app is meant to run with [https://github.com/ManXD3la/hayr-client] (HayR) client.

Please look at the README.md for more information on utilizing the client.

### Live Link and Demo Account

The live site can be accessed at [https://appnamehere.vercel.app/](https://appnamehere.vercel.app/)

To try the service, please use the credentials below to log in

Demo account: 

Username: hayr-arty010<br />
Password: p@stworld0fAn3wtEmpoyee4

## Client Documentation

HayR is an application for online journaling used by companies to create safe space to share feelings and thoughts. As you become more comfortable with entering a few words about your day or a simple moment as a reflection, you always have the option to reveal them to others anonymously. By sharing a reflection to the HayR community, you are able to see how others are during that day. When we accept and appreciate all thoughts and feelings that exist, we are able to appreciate the vastness of the human experience like stars in the night sky'

HayR is ideal for organizations with high-stress, fast-paced environments, and allows you to jot your thoughts and feelings with ease.

## Tech Stack

REACT, JavaScript, CSS3, HTML5, SCSS, NodeJS, ExpressJS, PostgreSQL

## To Run A Clean Start 

1. Clone this repository to your local machine
2. cd into the cloned repository
3. Remove the git history with rm -rf .get && git init
4. Install dependencies with npm install
5. Move the example Environment file to .env that will be ignored by git and read by React with mv example.env .env
6. Change project name in package.json to use whatever name you've given this version of the project 

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
Results of the test will be available in the terminal it was initiated in.
