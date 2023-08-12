const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Team33:DASS33AGSP@dass33.gl2aksm.mongodb.net/?retryWrites=true&w=majority');

const connection = mongoose.connection;
connection.once('open', function () {
    console.log("connected to mongodb");
})
