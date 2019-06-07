require('dotenv').config();

const PORT = Number(process.env.PORT || 3003);
let MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = MONGODB_URI_TEST;
}

module.exports = {
    MONGODB_URI,
    PORT
}
