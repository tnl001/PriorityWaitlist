# Description

This is a web application that simulates a priority waitlist that could be used (or modified to be used) in any type of business including hospitals, restaurants, etc. I built the front-end using React and CSS, and the back-end using Express.js and PostgreSQL.

# Getting started

1. Make sure you have postgreSQL installed on your machine.

2. Create a table called PriorityWaitlist with the following columns:

![image](https://user-images.githubusercontent.com/62983065/115165934-526dca00-a065-11eb-82bc-7054d9ebb68c.png)

NOTE: The primary key is uuid.

3. Open the git repository and use the command ``` npm install ``` to install the necessary dependencies.

4. Inside the /PriorityWaitlist/src/back_end/index.js file, change the databaseURL variable to your own database URL.

# To run the application

1. Navigate to the /PriorityWaitlist/src/back_end/ directory and use the command ``` npm start ``` to run the server.

2. Navigate to the /PriorityWaitlist/ directory and use the command ``` npm start ``` to run the front-end.
    


