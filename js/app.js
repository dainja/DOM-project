/**========================================================================
 *                           CONSTANTS
 *========================================================================**/
const inputCustomer = document.querySelector('#customer-name');
const inputCourse = document.querySelector('#course-name');
const inputAuthor = document.querySelector('#author-name');

const submitBtn = document.querySelector('.submit-btn');

const form = document.querySelector('#free-course');


/**==============================================
 **              enableSubmitButton
 *?  If all input fields are filled.
 *?  Show the submit button.
 *?  If not filled, make it inactive and opacity 0.5
 *=============================================**/
window.addEventListener('keyup', enableSubmitButton);

function enableSubmitButton() {
  if (
    inputCustomer.value != '' &&
    inputCourse.value != '' &&
    inputAuthor.value != ''
  ) {
    submitBtn.classList.remove('disabled');
  } else {
    submitBtn.classList.add('disabled');
  }
}
/*=============== END OF enableSubmitButton ==============*/


/**==============================================
 **              Submit Event
 *? When submit button gets clicked,
 *? run these codes
 *=============================================**/
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  /**==============================================
   *                IF
   *  Input values are filled, run the loading
   *  animation for 5seconds and then stop.
   *  After 5 seconds, add the text from the inputs
   *  to a card that will be created.
   *=============================================**/
  if (
    inputCustomer.value != '' &&
    inputCourse.value != '' &&
    inputAuthor.value != ''
  ) {
    const loadingElem = document.querySelector('.loading');
    loadingElem.classList.add('loading-show');

    setTimeout(loading, 5000);

    function loading(e) {
      loadingElem.classList.remove('loading-show');
    }

    setTimeout(addCourseFunc, 5000);

    /**============================================
     *               Add card function
     *=============================================**/
    function addCourseFunc(e) {
      const name = inputCustomer.value;
      const course = inputCourse.value;
      const author = inputAuthor.value;
      /**===================================================
       *     randomNumber
       *  Create a random number up til 200
       *  And add it to URL from picsum to get random image
       *====================================================**/
      const randomNumber = Math.floor(Math.random() * 200 + 1);
      /**=======================
       *     Create Course
       *  Create HTML with input
       *  from input fields inside
       *========================**/
      const createCourse = `
          <img src="https://picsum.photos/id/${randomNumber}/800/600?grayscale" alt="">
          <p class="name-title">Name: </p><span>${name}</span><br>
          <p class="course-title">Course: </p><span>${course}</span><br>
          <p class="author-title">Author: </p><span>${author}</span>
          `;

      /**==============================================
       *                Add card to HTML
       *  Take all the info from input values,
       *  select them with JS and add them back to HTML
       *  with innerHTML and appendChild.
       *=============================================**/
      const addCourse = document.createElement('div');
      const cardContainer = document.querySelector('.card-container');
      addCourse.classList.add('course-card');
      addCourse.innerHTML = createCourse;
      cardContainer.appendChild(addCourse);

      /**========================================================
       *                Whats inside localstorage?
       *  Run functions that check what is already inside
       *  localstorage keys. If empty, give me an empty array.
       *  If it already have keys and values, return them
       *  so i can add to them.
       *=========================================================**/
      const numberLocal = loadNumberFromLocalStorage();
      const nameLocal = loadNameFromLocalStorage();
      const courseLocal = loadCourseFromLocalStorage();
      const authorLocal = loadAuthorFromLocalStorage();

      /**==============================================
       *                Push to above
       *  Push the input field values to either the
       *  empty array we just got back or add to the array
       *  with existing keys and values.
       *=============================================**/
      numberLocal.push(randomNumber);
      nameLocal.push(inputCustomer.value);
      courseLocal.push(inputCourse.value);
      authorLocal.push(inputAuthor.value);

      /**==============================================
       *                Add to Localstorage
       *  Add what we got into localstorage and make
       *  it readable with JSON.stringify
       *=============================================**/
      localStorage.setItem('number', JSON.stringify(numberLocal));
      localStorage.setItem('name', JSON.stringify(nameLocal));
      localStorage.setItem('course', JSON.stringify(courseLocal));
      localStorage.setItem('author', JSON.stringify(authorLocal));

      /*********  Reset input fields  **********/
      inputCustomer.value = '';
      inputCourse.value = '';
      inputAuthor.value = '';
      submitBtn.classList.add('disabled');

      /*********  Run function (show clear cahe btn)  **********/
      getClearCacheBtn();
    }
  }
});

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

/**========================================================================
 *                             Paint the UI
 *  When website load, check to see what is inside the localstorage.
 *  Get the keys and values and with a for loop add them back to
 *  to the HTML.
 *========================================================================**/
function savedStorage() {
  const name = loadNameFromLocalStorage();
  const course = loadCourseFromLocalStorage();
  const author = loadAuthorFromLocalStorage();
  const number = loadNumberFromLocalStorage();

  let result = '';

  for (
    let i = 0, y = 0, x = 0, z = 0;
    i < name.length &&
    y < course.length &&
    x < author.length &&
    z < number.length;
    i++, y++, x++, z++
  ) {
    result = `
    <img src="https://picsum.photos/id/${number[z]}/800/600?grayscale" alt="">
    <p class="name-title">Name: </p><span>${name[i]}</span><br>
    <p class="course-title">Course: </p><span>${course[y]}</span><br>
    <p class="author-title">Author: </p><span>${author[x]}</span>
    `;

    const cardDiv = document.createElement('div');
    const cardContainer = document.querySelector('.card-container');
    cardDiv.classList.add('course-card');
    cardDiv.innerHTML = result;
    cardContainer.appendChild(cardDiv);
  }
}
savedStorage();
/*=========================== END OF Paint the UI ===========================*/



/**==============================================
 *                Clear cache button at load
 *  Check when website loads if localstorage
 *  has created any cards, if localstorage is
 *  not empty, then show clear cache button
 *  from load.
 *=============================================**/
const clearCache = document.querySelector('.clear-btn');
window.addEventListener('DOMContentLoaded', function (e) {
  if (localStorage.length >= 1) {
    clearCache.classList.remove('clear-hide');
  }
});

/**==============================================
 **              getClearCacheBtn
 *?  When card is created dynamically the clear
 *?  cache button will show up.
 *=============================================**/
function getClearCacheBtn() {
  if (localStorage.length >= 1) {
    clearCache.classList.remove('clear-hide');
  }
}

/**==============================================
 *                Delete Confirmation
 *  When user press Clear Cache, they will get a
 *  confirmation popup with a simple "are your sure"
 *  question. They can press Yes or No
 *=============================================**/
clearCache.addEventListener('click', function () {
  document.querySelector('.cd-popup').classList.add('is-visible');
});

/**==============================================
 *                Close popup
 *  Press either the X at the top right or NO
 *  to close the popup modal.
 *=============================================**/
const closeModal = document.querySelector('.cd-popup');
closeModal.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('no') ||
    e.target.classList.contains('cd-popup-close')
  ) {
    document.querySelector('.cd-popup').classList.remove('is-visible');
  }
});

/**==============================================
 *                Delete Cache
 *  At confirmation popup, if you click YES
 *  Then localStorage will be cleared and website
 *  will reload.
 *=============================================**/
const deleteCacheBtn = document.querySelector('.yes');
deleteCacheBtn.addEventListener('click', function () {
  localStorage.clear();
  document.querySelector('.cd-popup').classList.remove('is-visible');
  location.reload();
});
