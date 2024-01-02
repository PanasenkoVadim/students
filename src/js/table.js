export const students = [
    {
        surname: "Иванов",
        name: "Иван",
        lastname: "Иванович",
        date: "03.11.2002",
        startYear: "2023",
        faculty: "Фронтенд"
    },
    {
        surname: "Петров",
        name: "Петр",
        lastname: "Петрович",
        date: "03.11.2002",
        startYear: "2023",
        faculty: "Фронтенд"
    },
    {
        surname: "Михайлов",
        name: "Михаил",
        lastname: "Михайлович",
        date: "03.11.2002",
        startYear: "2023",
        faculty: "Фронтенд"
    },
]
const createTableRow = (obj) => {
    return `<tr>
    <td>${obj.surname} ${obj.name} ${obj.lastname}</td>
    <td>${obj.faculty}</td>
    <td>${obj.date}</td>
    <td>${obj.startYear}</td>
</tr>`
}

export const createTable = () => {
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    students.forEach(student => {
        tbody.innerHTML += createTableRow(student)
    })
}
