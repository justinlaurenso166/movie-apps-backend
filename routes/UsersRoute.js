const express = require("express")
const router = express.Router()
const Users = require("../services/Users")

router.get("/all_user", async(req, res) => {
    try {
        res.json(await Users.getUser())
    } catch (error) {
        console.log(error.message)
    }
})

router.post("/login", async(req, res) => {
    try {
        let data = await Users.login(req.body.username, req.body.password)
        if (data.length > 0) {
            res.status(200)
            res.json(data)
        } else {
            res.status(500).send("User not found! Please check your username and password")
        }
    } catch (error) {
        console.log(error.message)
    }
})

router.post("/register", async(req, res) => {
    try {
        let check_username = await Users.checkUsername(req.body.username);
        if (check_username.length > 0) {
            res.status(500)
            res.send("Username already exists")
        } else {
            let kode_user = "USR";
            let currentDate = new Date();
            let currentUser = (await Users.getUser()).length + 1;
            let create_user_id = kode_user + "-" + currentDate.getDate() + currentDate.getMonth() + currentDate.getFullYear() + "-" + currentUser;

            let data_from_user = {
                user_id: create_user_id,
                full_name: req.body.fullname,
                username: req.body.username,
                password: req.body.password,
                autorithy: 2,
            }
            let register_data = await Users.userRegister(data_from_user);
            if (register_data) {
                res.status(200).send("Account register success")
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;