const express = require("express")
const app = express()
const cors = require("cors")
const multer = require('multer')
const path = require('path')

const port = 8080;

const Movies = require("./services/Movies")

const UsersRoute = require("./routes/UsersRoute")
const MoviesRoute = require("./routes/MoviesRoute")
const RatingsRoute = require("./routes/RatingsRoute")
const FavoritesRoute = require("./routes/FavoritesRoute")

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static('public'));

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/') // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
}).single('image');

module.exports = upload

// app.use("/", (req, res) => {
//     res.json({ message: "Halo" })
// })

app.use('/user', UsersRoute);
app.use('/movies', MoviesRoute);
app.use('/movie_rating', RatingsRoute)
app.use('/user_favorite', FavoritesRoute)

app.post("/movies/add_movie", upload, async(req, res) => {
    try {
        if (!req.file) {
            console.log("No file upload");
        } else {
            let data = {
                name: req.body.name,
                image: req.file.filename,
                description: req.body.desc,
                genre: req.body.genre,
                status: req.body.status,
            }
            let response = await Movies.addMovies(data);
            if (response) {
                res.status(200)
                res.send("Success Add New Movie")
            }
            // console.log(data)
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }
})

app.put("/movies/edit/:id", upload, async(req, res) => {
    try {
        if (!req.file) {
            let data = {
                id: req.params.id,
                name: req.body.name,
                image: req.body.image,
                description: req.body.desc,
                genre: req.body.genre,
                status: req.body.status,
            }
            let response = await Movies.editMovie(data);
            if (response) {
                res.status(200)
                res.send("Success Edit Movie")
            }
        } else {
            let data = {
                id: req.params.id,
                name: req.body.name,
                image: req.file.filename,
                description: req.body.desc,
                genre: req.body.genre,
                status: req.body.status,
            }
            let response = await Movies.editMovie(data);
            if (response) {
                res.status(200)
                res.send("Success Edit Movie")
            }
        }
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})