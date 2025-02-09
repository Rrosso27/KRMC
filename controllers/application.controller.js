const { where } = require("../config/db");
const message = require("../lang/es/message");
const { Application } = require('../models');

/**
 * store 
 * @param {*} req
 * @param {*} res
 * @returns {json}
 */
const store = async (req, res) => {
    const { codigo, descripcion, resumen, idEmployee } = req.body
    try {
        const request = validation(req, res)
        if (request != "ok") {
            return request
        }
        await Application.create({
            codigo,
            descripcion,
            resumen,
            id_employee: idEmployee
        })
        return res.status(200).json({
            state: true,
            message: `Solicitud ${message.createdSuccess}`
        })
    } catch (error) {
        console.error(`${message.errorInserting} Solicitud : ${error}`)
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}

/**
 * get By id Application
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findOne({
            where: { id }
        });
        return res.status(200).json({
            state: true,
            data: application
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}

/**
 * get Applications
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const getAll = async (req, res) => {
    try {
        const application = await Application.findAll();
        return res.status(200).json({
            state: true,
            data: application
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}
/**
 * update Application
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const update = async (req, res) => {
    const { id } = req.params;
    const { codigo, descripcion, resumen, idEmployee } = req.body

    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ state: false, error: message.notFound });
        }
        const request = validationUp(req, res)
        if (request != "ok") {
            return request
        }
        await Application.update(
            {
                codigo,
                descripcion,
                resumen,
            },
            { where: { id } }
        )

        return res.status(200).json({
            state: true,
            message: message.createdSuccess
        })
    } catch (error) {
        console.log('update Error', error)
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}
/**
 * delete Application
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const deleteApplication = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await Application.findByPk(id);
        if (!application) {
            return res.status(404).json({ state: false, error: message.notFound });
        }
        await Application.destroy({ where: { id } })
        return res.status(200).json({
            state: true,
            message: message.deleteData
        })

    } catch (error) {
        console.log('update Error', error)
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}
/**
 * validate from data 
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const validation = (req, res) => {
    const { codigo, descripcion, resumen, idEmployee } = req.body

    if (!codigo) {
        return res.status(400).json({ state: false, error: `codigo ${message.requireData}` });
    }
    if (!descripcion) {
        return res.status(400).json({ state: false, error: `descripcion ${message.requireData}` });
    }
    if (!resumen) {
        return res.status(400).json({ state: false, error: `resumen ${message.requireData}` });
    }
    if (!idEmployee) {
        return res.status(400).json({ state: false, error: `id_employee ${message.requireData}` });
    }
    return "ok";
}

const validationUp = (req, res) => {
    const { codigo, descripcion, resumen, idEmployee } = req.body

    if (!codigo) {
        return res.status(400).json({ state: false, error: `codigo ${message.requireData}` });
    }
    if (!descripcion) {
        return res.status(400).json({ state: false, error: `descripcion ${message.requireData}` });
    }
    if (!resumen) {
        return res.status(400).json({ state: false, error: `resumen ${message.requireData}` });
    }
   
    return "ok";
}

module.exports = { store, getById, getAll, update, deleteApplication };
