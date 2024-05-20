const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDB', {
    useNewUrlParser: true
},
err => {
    if (err) {
        console.log('Error in connection: ', err);
    } else {
        console.log('Connection succeeded');
    }
});

require('./student.model')