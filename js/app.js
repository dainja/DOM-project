const inputCustomer = document.querySelector('#customer-name');
const inputCourse = document.querySelector('#course-name');
const inputAuthor = document.querySelector('#author-name');

const submitBtn = document.querySelector('.submit-btn')

const form = document.querySelector('#free-course')



window.addEventListener('keyup', enableSubmitButton)

function enableSubmitButton() {
  if (inputCustomer.value != '' && inputCourse.value != '' && inputAuthor.value != '') {
    submitBtn.classList.remove('disabled')
  } else {
    submitBtn.classList.add('disabled')
  }
}


submitBtn.addEventListener('click', function (e) {
  e.preventDefault()
  if (inputCustomer.value != '' && inputCourse.value != '' && inputAuthor.value != '') {
    const loadingElem = document.querySelector('.loading');
    loadingElem.classList.add('loading-show')

    setTimeout(loading, 5000);

    function loading(e) {
      loadingElem.classList.remove('loading-show')
    }

    setTimeout(addCourseTest, 5000);




    function addCourseTest(e) {
      const name = inputCustomer.value;
      const course = inputCourse.value;
      const author = inputAuthor.value;
      const randomNumber = Math.floor(Math.random() * 200 + 1);
      const createCourse =
        `
      <img src="https://picsum.photos/id/${randomNumber}/320/240" alt="">
      <p class="name-title">Name: </p><span>${name}</span><br>
      <p class="course-title">Course: </p><span>${course}</span><br>
      <p class="author-title">Author: </p><span>${author}</span>
       `;



      const addCourse = document.createElement('div')
      const cardContainer = document.querySelector('.card-container');
      addCourse.classList.add('course-card')
      addCourse.innerHTML = createCourse;
      cardContainer.appendChild(addCourse)




      const numberLocal = loadNumberFromLocalStorage()
      const nameLocal = loadNameFromLocalStorage()
      const courseLocal = loadCourseFromLocalStorage()
      const authorLocal = loadAuthorFromLocalStorage()

      numberLocal.push(randomNumber)
      nameLocal.push(inputCustomer.value);
      courseLocal.push(inputCourse.value);
      authorLocal.push(inputAuthor.value)

      localStorage.setItem('number', JSON.stringify(numberLocal))
      localStorage.setItem('name', JSON.stringify(nameLocal))
      localStorage.setItem('course', JSON.stringify(courseLocal));
      localStorage.setItem('author', JSON.stringify(authorLocal));




      inputCustomer.value = '';
      inputCourse.value = '';
      inputAuthor.value = '';
      getClearCacheBtn()
    }
  }

  console.log(e.target)

})



function loadNameFromLocalStorage() {
  let name;
  if (localStorage.getItem('name')) {

    name = JSON.parse(localStorage.getItem('name'));
  } else {
    name = [];
  }

  return name;

}

function loadCourseFromLocalStorage() {

  let course;

  if (localStorage.getItem('course')) {

    course = JSON.parse(localStorage.getItem('course'));
  } else {
    course = [];
  }

  return course;

}

function loadAuthorFromLocalStorage() {

  let author;

  if (localStorage.getItem('author')) {

    author = JSON.parse(localStorage.getItem('author'));
  } else {
    author = [];
  }

  return author;

}

function loadNumberFromLocalStorage() {

  let number;

  if (localStorage.getItem('number')) {

    number = JSON.parse(localStorage.getItem('number'));
  } else {
    number = [];
  }

  return number;

}


function savedStorage() {

  const name = loadNameFromLocalStorage()
  const course = loadCourseFromLocalStorage()
  const author = loadAuthorFromLocalStorage()
  const number = loadNumberFromLocalStorage()

  let result = '';

  for (let i = 0, y = 0, x = 0, z = 0;
    ((i < name.length) && (y < course.length) && (x < author.length) && (z < number.length)); i++, y++, x++, z++) {
    result =

      `
    <img src="https://picsum.photos/id/${number[z]}/320/240" alt="">
    <p class="name-title">Name: </p><span>${name[i]}</span><br>
    <p class="course-title">Course: </p><span>${course[y]}</span><br>
    <p class="author-title">Author: </p><span>${author[x]}</span>
    `;

    const cardDiv = document.createElement('div')
    const cardContainer = document.querySelector('.card-container');
    cardDiv.classList.add('course-card')
    cardDiv.innerHTML = result;
    cardContainer.appendChild(cardDiv)
    // console.log(result)
    // console.log(cardDiv)
  }
}
savedStorage()





const clearCache = document.querySelector('.clear-btn')
window.addEventListener('DOMContentLoaded', function (e) {
  if (localStorage.length >= 1) {
    clearCache.classList.remove('clear-hide')
  }
})

function getClearCacheBtn() {
  if (localStorage.length >= 1) {
    clearCache.classList.remove('clear-hide')
  }

}

clearCache.addEventListener('click', function () {
  document.querySelector('.cd-popup').classList.add('is-visible')
})

const closeModal = document.querySelector('.cd-popup')
closeModal.addEventListener('click', function (e) {
  if (e.target.classList.contains('no') || e.target.classList.contains('cd-popup-close')) {
    document.querySelector('.cd-popup').classList.remove('is-visible')
  }
})

const deleteCacheBtn = document.querySelector('.yes')
deleteCacheBtn.addEventListener('click', function () {
  localStorage.clear()
  document.querySelector('.cd-popup').classList.remove('is-visible')
  location.reload();
})