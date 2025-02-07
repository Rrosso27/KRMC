const bcrypt = require("bcryptjs");
const message = require("../lang/es/message");
const { User } = require('../models');

const jwt = require("jsonwebtoken");
/**
 * register 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUserData = await existingUser(email);

        if (existingUserData) {
            return res.status(400).json({ error: message.existingUser });
        }
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol: rol || 'user'
        })

        return res.status(201).json({
            message: `Usuario ${message.createdSuccess}`,
            user
        })
    } catch (error) {
        console.error(`${message.errorInserting} Usuario : ${error}`)
        return res.status(500).json({ error: `${message.errorServe} erro ${error}` })
    }
};
/**
 * login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await existingUser(email);
        if (!user) {
            return res.status(401).json({ error: message.credentialError });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ error: message.credentialError });
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 * existing user
 * @param {string} email
 * @return {json} usur 
 */
const existingUser = async (email) => {
    const user = await User.findOne({
        where: { email }
    });
    return user
};
module.exports = { register, login };
