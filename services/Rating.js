const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const checkRating = async(data_rating) => {
    const rows = await db.query(`SELECT * FROM ratings WHERE user_id='${data_rating.user_id}' AND movie_id='${data_rating.movie_id}'`)
    const check = helper.emptyOrRows(rows)

    return check;
}

const insertRating = async(data_rating) => {
    const rows = await db.query("INSERT INTO ratings (user_id, movie_id, rating) VALUES ('" + data_rating.user_id + "' ,'" + data_rating.movie_id + "','" + data_rating.rating + "')");
    const check = helper.emptyOrRows(rows);

    return check;
}

const updateRating = async(data_rating) => {
    const rows = await db.query(`UPDATE ratings SET rating='${data_rating.rating}' WHERE user_id='${data_rating.user_id}' AND movie_id='${data_rating.movie_id}'`);
    const check = helper.emptyOrRows(rows)

    return check
}

const getByMovieId = async(movie_id) => {
    const rows = await db.query(`SELECT * FROM ratings WHERE movie_id='${movie_id}'`)
    const check = helper.emptyOrRows(rows)

    return check;
}

module.exports = {
    checkRating,
    updateRating,
    insertRating,
    getByMovieId
}