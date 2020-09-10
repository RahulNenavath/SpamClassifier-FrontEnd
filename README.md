# Spam Classifer:

A simple front-end web application to check whether a given sms text is actually spam or not. The predictions are made by a LSTM Model which is served using flask and deployed via docker. Users can also report misclassified instances which shall be stored in a firebase database.

## Tech Stack:

Reactjs and Firebase.

## Functionalities available:

1) Check if the sms is spam or ham.
2) User login and Registration.
3) Report Misclassified Instances ( User must be logged in).

Note: To just check if the sms is spam / ham, user need not be logged in. Only to report misclassified instances the user must be logged in.

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000`
