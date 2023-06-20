// const express = require('express') //
import express from 'express'

const app = express()

app.get('/qqq', function (req, res) {
    res.send('Hello Worldddd')
})

app.listen(3000)