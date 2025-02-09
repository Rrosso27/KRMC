const { where } = require("../config/db");
const message = require("../lang/es/message");
const { Employee } = require('../models');

/**
 * store 
 * @param {*} req
 * @param {*} res
 * @returns {json}
 */
const store = async (req, res) => {
    const { fechaIngreso, nombre, salario } = req.body
    try {
        const request = validation(req, res)
        if (request != "ok") {
            return request
        }
        const employee = await Employee.create({
            fecha_ingreso: fechaIngreso,
            nombre,
            salario,
        })
        return res.status(200).json({
            state: true,
            message: `Empleado ${message.createdSuccess}`
        })
    } catch (error) {
        console.error(`${message.errorInserting} Empleado : ${error}`)
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}

/**
 * get By id employe
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findOne({
            where: { id }
        });
        return res.status(200).json({
            state: true,
            data: employee
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}

/**
 * get employees
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const getAll = async (req, res) => {
    try {
        const employee = await Employee.findAll();
        return res.status(200).json({
            state: true,
            data: employee
        })
    } catch (error) {
        return res.status(500).json({ state: false, error: `${message.errorServe} erro ${error}` })
    }
}
/**
 * update employee
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const update = async (req, res) => {
    const { id } = req.params;
    const { fechaIngreso, nombre, salario } = req.body
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ state: false, error: message.notFound });
        }
        const request = validation(req, res)
        if (request != "ok") {
            return request
        }
        await employee.update(
            {
                fecha_ingreso: fechaIngreso,
                nombre,
                salario,
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
 * delete employee
 * @param {*} req 
 * @param {*} res 
 * @returns {json}
 */
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ state: false, error: message.notFound });
        }
        await Employee.destroy({ where: { id } })
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
    const { fechaIngreso, nombre, salario } = req.body
    const fechaActual = new Date();
    const fechaIngresada = new Date(fechaIngreso);
    if (!fechaIngreso) {
        return res.status(400).json({ state: false, error: `fecha de ingreso  ${message.requireData}` });
    } else if (fechaIngresada < fechaActual) {
        return res.status(400).json({ state: false, error: `fecha de ingreso  ${message.validateDate}` });
    }
    if (!nombre) {
        return res.status(400).json({ state: false, error: `nombre ${message.requireData}` });
    }
    if (!salario) {
        return res.status(400).json({ state: false, error: `salario ${message.requireData}` });
    }

    return "ok";
}

module.exports = { store, getById, getAll, update, deleteEmployee };
