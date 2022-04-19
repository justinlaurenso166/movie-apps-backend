const express = require("express")
const router = express.Router()
const Ratings = require("../services/Rating")

router.post("/user", async(req, res) => {
    try {
        let find_rating = await Ratings.checkRating(req.body);
        if (find_rating.length > 0) {
            res.status(200)
            res.json(find_rating)
        } else {
            res.json([])
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/rate", async(req, res) => {
    try {
        console.log(req.body)
        let check_rating = await Ratings.checkRating(req.body);
        if (check_rating.length > 0) {
            let update_rating = await Ratings.updateRating(req.body);
            if (update_rating) {
                res.status(200).send("Success update rating")
            } else {
                res.status(500)
            }
        } else {
            let insert_rating = await Ratings.insertRating(req.body);
            if (insert_rating) {
                res.status(200).send("Success add rating");
            } else {
                res.status(500)
            }
        }

    } catch (error) {
        console.log(error)
    }
})

router.get("/movie/:id", async(req, res) => {
    try {
        let find_by_movieid = await Ratings.getByMovieId(req.params.id);
        if (find_by_movieid.length > 0) {
            res.status(200)
            res.json(find_by_movieid)
        } else {
            res.json([])
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router