const loginRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash)))
        return res.status(403).json({ error: 'invalid username or password' });

    const tokenData = {
        username: user.username,
        id: user.id
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    res.json({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
