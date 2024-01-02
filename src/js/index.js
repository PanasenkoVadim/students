const { handleFormSubmit } = require("./form")
const { createTable } = require("./table")

document.addEventListener("DOMContentLoaded", function () {
    createTable()
    handleFormSubmit()
})