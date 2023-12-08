const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        console.error(error);
    }
}

export default connect