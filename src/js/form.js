

export const handleFormSubmit = () => {
    const form = document.getElementById("createStudentForm")
    form.addEventListener("submit", function (e) {
        e.preventDefault()
        const student = {
            surname: e.target.surname.value,
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            date: e.target.birthDate.value,
            startYear: e.target.startYear.value,
            faculty: e.target.faculty.value
        }
        fetch("http://localhost:4444/students",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(student)
            })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })
    })
}