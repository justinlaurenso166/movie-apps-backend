const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const getMovies = async() => {
    const rows = await db.query("SELECT * FROM list_movies");
    const check = helper.emptyOrRows(rows)

    return check;
}

const filterMovies = async(status) => {
    const rows = await db.query("SELECT * FROM list_movies WHERE status='" + status + "'");
    const check = helper.emptyOrRows(rows)

    return check;
}

const addMovies = async(data) => {
    const rows = await db.query("INSERT INTO list_movies (image, name, description, genre, status) VALUES ('" + data.image + "' ,'" + data.name + "' ,  '" + data.description + "' ,  '" + data.genre + "' ,  '" + data.status + "')");
    const check = helper.emptyOrRows(rows);

    return check
}

const deleteMovie = async(id) => {
    const rows = await db.query("DELETE FROM list_movies WHERE id='" + id + "'");
    const check = helper.emptyOrRows(rows);

    return check
}

const getMovieById = async(id) => {
    const rows = await db.query("SELECT * FROM list_movies WHERE id='" + id + "'");
    const check = helper.emptyOrRows(rows);

    return check
}

const editMovie = async(data) => {
    const rows = await db.query("UPDATE list_movies SET image='" + data.image + "',name='" + data.name + "', description='" + data.description + "', genre='" + data.genre + "', status='" + data.status + "' WHERE id=" + data.id + "")
    const check = helper.emptyOrRows(rows);

    return check;
}

module.exports = {
    addMovies,
    getMovies,
    deleteMovie,
    getMovieById,
    editMovie,
    filterMovies,
}