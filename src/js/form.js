

import { students, createTable } from "./table";

export const handleFormSubmit = () => {
    const form = document.getElementById("createStudentForm")
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(e.target.birthDate.value)
        const student = {
            name: e.target.name.value,
            surname: e.target.surname.value,
            lastname: e.target.lastname.value,
            date: e.target.birthDate.value,
            startYear: e.target.startYear.value,
            faculty: e.target.faculty.value
        }

        students.push(student);
        createTable()
    })
}