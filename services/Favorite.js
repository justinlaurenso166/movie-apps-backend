const db = require('./db');
const helper = require('../helper');
const config = require('../config');

const checkFavorite = async(data_rating) => {
    const rows = await db.query(`SELECT * FROM favorites WHERE user_id='${data_rating.user_id}' AND movie_id='${data_rating.movie_id}'`)
    const check = helper.emptyOrRows(rows)

    return check;
}

const addFavorite = async(data_favorite) => {
    const rows = await db.query("INSERT INTO favorites (user_id, movie_id) VALUES ('" + data_favorite.user_id + "' ,'" + data_favorite.movie_id + "')");
    const check = helper.emptyOrRows(rows);

    return check;
}

const removeFavorite = async(data_rating) => {
    const rows = await db.query(`DELETE FROM favorites WHERE user_id='${data_rating.user_id}' AND movie_id='${data_rating.movie_id}'`);
    const check = helper.emptyOrRows(rows)

    return check
}

const getFavoriteById = async(user_id) => {
    const rows = await db.query(`SELECT list_movies.*, favorites.* FROM favorites INNER JOIN list_movies ON favorites.movie_id = list_movies.id`)
    const check = helper.emptyOrRows(rows)

    return check;
}

module.exports = {
    checkFavorite,
    removeFavorite,
    addFavorite,
    getFavoriteById
}