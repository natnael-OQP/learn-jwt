const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

const users = [
    {
        id: '10',
        username: 'natnael',
        password: 'natnael',
        isAdmin: true,
    },
    {
        id: '0',
        username: 'jonas',
        password: 'jonas',
        isAdmin: false,
    },
]

// middleware
app.use(express.json())

// login
app.post('/api/login', async (req, res) => {
    const user = users.find((user) => {
        return (
            user.username === req.body?.username &&
            user.password === req.body?.password
        )
    })

    if (user) {
        // generate token
        const accessToken = jwt.sign({ id: user.id }, 'Me89qrh9sd', {
            expiresIn: '2s',
        })
        res.json({
            username: user.username,
            accessToken,
        })
    } else {
        res.status(400).json('wrong credential ')
    }
})

// verify middleware
const verify = (req, res, next) => {
    const { authorization } = req.headers
    if (authorization) {
        const token = authorization.split(' ')[1]
        console.log(authorization)
        jwt.verify(token, 'Me89qrh9sd', (err, data) => {
            if (err) {
                return res.status(403).json(err)
            }
            req.user = data
            next()
        })
    } else {
        res.status(401).json('you are not authenticated')
    }
}

// delete user
app.delete('/api/users/:userId', verify, (req, res) => {
    if (req.user.id === req.params.userId) {
        return res.status(200).json('user has been deleted')
    } else {
        return res.status(200).json('you are not allowed to deleted this user')
    }
})

app.listen(5000, () => console.log('Backend server is running!'))
