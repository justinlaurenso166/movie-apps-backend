const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getUser = async() => {
    const rows = await db.query("SELECT * FROM users");
    const check = helper.emptyOrRows(rows);

    return check
}

const login = async(username, password) => {
    const rows = await db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`)
    const check = helper.emptyOrRows(rows)

    return check;
}

const checkUsername = async(username) => {
    const rows = await db.query(`SELECT * FROM users WHERE username='${username}'`)
    const check = helper.emptyOrRows(rows)

    return check;
}

const userRegister = async(data_user) => {
    const rows = await db.query("INSERT INTO users (user_id, full_name, username, password, autorithy) VALUES ('" + data_user.user_id + "' ,'" + data_user.full_name + "' ,  '" + data_user.username + "' ,  '" + data_user.password + "' ,  '" + data_user.autorithy + "')");
    const check = helper.emptyOrRows(rows);

    return check;
}

module.exports = {
    getUser,
    login,
    checkUsername,
    userRegister
}