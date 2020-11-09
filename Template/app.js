// custom modules
const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const expressSession = require('express-session');


//Variables are created that contain controllers
const createClient = require('./controllers/createClient');
const deleteClient = require('./controllers/deleteClient');
const updateClient = require('./controllers/updateClient');

const createAccount = require('./controllers/createAccount');
const deleteAccount = require('./controllers/deleteAccount');
const updateAccount = require('./controllers/updateAccount');




/* //Variables are created that contain controllers
const createUser = require("./controllers/createUser");
const createLesson = require ("./controllers/createLesson");
const createBooking = require("./controllers/createBooking");*/