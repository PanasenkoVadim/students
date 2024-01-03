// fetch("http://localhost:4444/students").then(res => res.json()).then(data => {
//     if (data) {
//         createTable(data)
//     }
// })
const fetchStudents = async () => {
    try {
        const response = await fetch("http://localhost:4444/students")
        const data = await response.json()
        return data
    } catch (error) {
        console.warn(error)
    }
}


const createTableRow = (obj) => {
    return `<tr data-id="${obj.id}">
    <td>${obj.surname} ${obj.name} ${obj.lastname}</td>
    <td>${obj.faculty}</td>
    <td>${obj.date}</td>
    <td>${obj.startYear}</td>
    <td><button class="removeStudent">Удалить</button></td>
</tr>`
}

export const createTable = (students) => {
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = ""
    if (!students) return
    students.forEach(student => {
        tbody.innerHTML += createTableRow(student)
        document.querySelectorAll(".removeStudent").forEach(btn => btn.addEventListener("click", removeStudent))
    })
}

fetchStudents().then(students => createTable(students))

const sortByName = () => {
    const btn = document.getElementById("sortByName")
    btn.addEventListener("click", function () {
        if (btn.classList.contains("sorted")) {
            btn.classList.remove("sorted")
            fetchStudents().then(students => {
                students.sort((a, b) => b.surname > a.surname ? 1 : -1)
                createTable(students)
            })
        } else {
            fetchStudents().then(students => {
                students.sort((a, b) => a.surname > b.surname ? 1 : -1)
                btn.classList.add("sorted")
                createTable(students)
            })
        }
    })
}

const sortByStartYear = () => {
    const btn = document.getElementById("sortByStartYear")
    btn.addEventListener("click", function () {
        if (btn.classList.contains("sorted")) {
            btn.classList.remove("sorted")
            fetchStudents().then(students => {
                students.sort((a, b) => b.startYear > a.startYear ? 1 : -1)
                createTable(students)
            })
        } else {
            fetchStudents().then(students => {
                students.sort((a, b) => a.startYear > b.startYear ? 1 : -1)
                btn.classList.add("sorted")
                createTable(students)
            })
        }

    })
}
const removeStudent = (e) => {
    if (confirm("Вы уверены, что хотите удалить студента?")) {
        const btn = e.target
        const id = btn.closest("tr[data-id]").dataset.id
        fetch('http://localhost:4444/students/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
    }

}

sortByName()
sortByStartYear()