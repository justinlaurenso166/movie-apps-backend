const express = require("express")
const router = express.Router()
const Favorite = require("../services/Favorite")

router.post("/user", async(req, res) => {
    try {
        let find_favorite = await Favorite.checkFavorite(req.body);
        if (find_favorite.length > 0) {
            res.status(200)
            res.json(find_favorite)
        } else {
            res.json([])
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/user/:id", async(req, res) => {
    try {
        let find_favorite_by_id = await Favorite.getFavoriteById(req.params.id);
        if (find_favorite_by_id.length > 0) {
            res.status(200)
            res.json(find_favorite_by_id)
        } else {
            res.json([])
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add", async(req, res) => {
    try {
        console.log(req.body)
        let find_favorite = await Favorite.checkFavorite(req.body);
        if (find_favorite.length > 0) {
            let delete_favorite = await Favorite.removeFavorite(req.body)

            if (delete_favorite) {
                res.status(200)
            } else {
                res.status(500)
            }
        } else {
            let add_favorite = await Favorite.addFavorite(req.body);
            if (add_favorite) {
                res.status(200)
            } else {
                res.status(500)
            }
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router