// const express = require('express') //
import express from 'express'

const app = express()

app.get('/qqq', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)