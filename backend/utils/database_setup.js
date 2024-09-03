const mongoose = require("mongoose")

const db_connect = () => {

    main().catch(err => console.log(err));

    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/ecom');
    }
    
}

module.exports = db_connect;
