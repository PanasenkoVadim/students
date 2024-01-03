const fs = require('fs')
const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
let rawdata = fs.readFileSync('db.json'); // Читаем файл. Название файла поменять на свое
let parseddata = JSON.parse(rawdata); // парсим и получаем JS объект из строки

const port = 4444
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1 style='color:#252525; font-family: sans-serif; text-align: center; margin-top: 100px;'>Welcome to Express!</h1>")
    // res.json({
    //     name: "vadim"
    // })
})

app.get("/students", (req, res) => {
    res.json(parseddata)
})
app.post("/students", (req, res) => {
    Object.values(req.body).forEach(field => {
        if (field.length === 0) {
            return res.status(400).res.json({
                message: "Заполните все поля формы"
            })
        }
    })
    req.body.id = uuidv4()
    parseddata.push(req.body)
    let data = JSON.stringify(parseddata);
    fs.writeFileSync('db.json', data);
    return res.status(200).res.json(parseddata)

})
app.delete("/students/:id", (req, res) => {
    const postId = req.params.id
    console.log(parseddata)
    parseddata = parseddata.filter(student => {
        return student.id !== postId
    })

    let data = JSON.stringify(parseddata);
    fs.writeFileSync('db.json', data);
})
//Запуск сервера
app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`Server started on port ${port}`)
})




