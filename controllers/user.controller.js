const message = require("../lang/es/message");
const { User } = require('../models');

/**
 * get users
 * @param {*} req
 * @param {*} res
 * @return {json} 
 */
const getAll = async (req, res) => {
    try {
        const user = await User.findAll();
        return res.status(201).json({
            state: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }

}

/**
 * get user By imail
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({
            where: { email }
        });
        return res.status(201).json({
            state: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}


module.exports = { getAll, getByEmail};
