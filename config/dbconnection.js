const mongoose = require("mongoose");

const connectDb = async () => {

    try {

        const connect = await mongoose.connect(
            process.env.CONNECTION_STRING
        );

        console.log(
            "Database connected:",
            connect.connection.host
        );
        console.log("DB Name:", connect.connection.name);

    } catch (err) {

        console.log(err);

        process.exit(1);
    }
}
console.log(process.env.CONNECTION_STRING);

module.exports = connectDb;