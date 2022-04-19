const express = require("express")
const router = express.Router()
const Movies = require("../services/Movies")
const upload = require("../app");

router.get("/all", async(req, res) => {
    try {
        let data = await Movies.getMovies();
        if (data.length > 0) {
            res.status(200)
            res.json(data)
        }
    } catch (error) {
        console.log(error)
    }
});

router.get("/:status", async(req, res) => {
    try {
        let data = await Movies.filterMovies(req.params.status);
        if (data.length > 0) {
            res.status(200)
            res.json(data)
        }
    } catch (error) {
        console.log(error)
    }
});

router.delete("/delete/:id", async(req, res) => {
    try {
        let response = await Movies.deleteMovie(req.params.id);
        if (response) {
            res.status(200);
            res.send("Delete movie success")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/movie/:id", async(req, res) => {
    try {
        let response = await Movies.getMovieById(req.params.id);
        if (response.length > 0) {
            res.status(200)
            res.json(response)
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;