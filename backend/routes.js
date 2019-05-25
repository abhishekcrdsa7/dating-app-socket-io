const router = require('express').Router();
const dbFunctions = require('./utilityFunctions/dbFunctions');
const utilFunctions = require('./utilityFunctions/utilFunctions');


router.get('/users', async (req, res) => {
    const users = await dbFunctions.findAllUsers();
    res.send({users});
});

router.post('/login', async (req,res) => {
    const obj = req.body;
    const result = await dbFunctions.findUser(obj);
    if(result) {
        const chkPass = await utilFunctions.checkPassword(obj.password, result.password);
        if(result && chkPass) {
            const token = utilFunctions.createJWTToken(result);
            return res.send({auth: true, token});
        }else {
            return res.send({auth: false, token: null});
        }
    }else {
        return res.send({auth: false, token: null});
    }
});

router.post('/register', async (req, res) => {
    const obj = req.body;
    const hash = await utilFunctions.generateHashPassword(obj.password);
    const newUser = {
        email: obj.email,
        password: hash,
        picture: obj.picture
    };
    const result = await dbFunctions.addUser(newUser);
    if(result) {
        const token = utilFunctions.createJWTToken(result);
        return res.send({auth: true, token});
    }else if(!result) {
        return res.send({auth: false, token: null});
    }
});

module.exports = router;
