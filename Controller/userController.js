const bcrypt = require('bcrypt')
const User = require('../model/UserModel')
let jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    let { firstName, lastName, email, password } = req.body
    User.findOne({ email: email }).exec(async (err, user) => {
        if (err) return console.log(err)
        if (user) {
            return res.status(400).json({ message: 'Email is already existed' })
        }
        if (!user) {
            let passwordSave = await bcrypt.hash(password, 10)
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: passwordSave
            })
            user.save((err, user) => {
                if (err) return console.log(err)
                if (user) {
                    return res.status(200).json(user)
                }
            })
        }
    })

}
exports.signin = (req, res) => {

    let { email, password } = req.body
    User.findOne({ email: email }).select("firstName lastName email password").exec(async (err, user) => {
        if (err) return res.status(404).json({ err })
        if (!user) {
            return res.status(400).json({ message: 'Email or password is wrong' })
        }
        if (user) {
            let passwordCompare = await bcrypt.compare(password, user.password)

            if (passwordCompare) {
                let token = jwt.sign({ userId: user._id }, process.env.TOKEN)
                return res.status(200).json({
                    user: user,
                    token: token
                })

            } else {
                return res.status(404).json({ message: 'Email or password is wrong' })
            }
        } else {

        }
    })
}
exports.getUserDetail = (req, res) => {
    User.find({ _id: req.user.userId }).exec((err, user) => {
        err ? res.status(400).json({ message: err }) : null
        user ? res.status(200).json(user) : null
    })
}
