const mongoose = require('mongoose');
const BASE_URL = process.env.BASE_URL

    mongoose.connect('mongodb://127.0.0.1/task-management')
       