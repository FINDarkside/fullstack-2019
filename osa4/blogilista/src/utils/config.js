require('dotenv').config();

const PORT = Number(process.env.PORT || 3003);
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI,
    PORT
}
