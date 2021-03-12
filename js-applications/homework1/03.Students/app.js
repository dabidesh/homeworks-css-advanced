const tbody = document.querySelector('tbody');

const setRow = (fName, lName, fNumber, grade) => {

  tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${fName}</td>
                <td>${lName}</td>
                <td>${fNumber}</td>
                <td>${grade}</td>
            </tr>`);
};

const createStudent = (event) => {
  event.preventDefault();
  let [firstName, lastName, facultyNumber, grade] = [...document.querySelectorAll('input')]
    .map(a => a.value);

  grade = +grade;

  if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '' || !(/^[\d]+$/).test(facultyNumber) || isNaN(grade)) {
    console.log('Invalid field or fields!');
    alert(`Invalid field or fields!\n
    First Name, Last Name: non empty string\n
    Faculty Number: string of numbers\n
    Grade: number.\n`);
    return;
  }

  grade = grade.toFixed(2);

  setRow(firstName, lastName, facultyNumber, grade);

  sendStudent({ firstName, lastName, facultyNumber, grade });

  form.reset();
};

const sendStudent = async (student) => {
  const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });
  const data = await response.json();
  return data;
};

const getAllStudents = async () => {
  const url = 'http://localhost:3030/jsonstore/collections/students';

  const response = await fetch(url);
  const data = await response.json();

  Object.values(data).forEach(s => {
    setRow(s.firstName, s.lastName, s.facultyNumber, s.grade);
  });
};

getAllStudents();
form.addEventListener('submit', createStudent);

