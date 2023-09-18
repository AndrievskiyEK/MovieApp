// получение данных от пользователя
const movieInputNode = document.getElementById("moviesFormInput");
const movieAddButtonNode = document.getElementById("movieAddButton");
const moviesListNode = document.getElementById("movieslist");
const validationMessageNode = document.getElementById('validationMessage');

let movieList = [];

// получение данных из LS

if (localStorage.getItem('movieList')){
    movieList = JSON.parse(localStorage.getItem('movieList')); 
    //Рендер из LS
    movieList.forEach((movie) => renderMovie(movie));
}

movieInputNode.addEventListener('input', validation);
// добавление фильма
movieAddButtonNode.addEventListener('click', addMovie);
// удаление фильма
moviesListNode.addEventListener('click', deleteMovie);
//
moviesListNode.addEventListener('click', doneMovie);


//-----ФУНКЦИИ------
function addMovie(event) {
    //отмена отправки формы (Обновление страницы)
    event.preventDefault();
    //получение данных с input     
    const MovieName = movieInputNode.value;
    //проверка 
    validation(MovieName);
    //описываем список фильмов через массив
    const newMovie = {
        id: Date.now(),
        name: MovieName,
        done: false,
    }
    //Записываем объект newMovie в массив movieList
    movieList.push(newMovie);

    renderMovie (newMovie);

    //Очищаем поле ввода и возвращаем фокус на поле ввода
    movieInputNode.value = '';
    movieInputNode.focus(); 
    saveToLocalStorage (); 
}

function deleteMovie (event) {
    //Проверяем, что клик был не по кнопке "удалить"
    if (event.target.dataset.action !=="delete")return;
    //Если клик был по кнопке удалить, ищем родителя с классом movies__item через метод event.target.closest
    const parenNode = event.target.closest(".movies__item");
    //Определяем ID родителя и преобразуем его из строки в число
    const id = Number(parenNode.id);
    //находим index родителя в массиве
    const index = movieList.findIndex( (movie) => movie.id === id);
    //Удаляем фильм из массива с фильмами
    movieList.splice(index,1);//начиная с index удаляем 1 элемент
    saveToLocalStorage ();
    //Удаляем задачу из разметки
    parenNode.remove();  

}

function doneMovie(event) {
    //Проверяем, что клик был не по кнопке "удалить", то завершаем выполнение функции
    if (event.target.dataset.action !=="done")return;
    //Иначе если клик был по кнопке то определяем родителя. 
    const parentNode = event.target.closest('.movies__item');
    //Определяем ID
    const id = Number(parentNode.id);
    // Находим элемент через метод find
    const movie = movieList.find( (movie) => movie.id === id);
    //Меняем статус done на обратный
    movie.done = !movie.done;
   //Ищем родителя с классом movies__item и переключаем класс
    //const movieTitle = parentNode.querySelector('.movies__item');
    parentNode.classList.toggle('movies__item-check');
    movieTitle = parentNode.querySelector('.movies__item-indication');
    movieTitle.classList.toggle('movies__item-indication-used');
    saveToLocalStorage ();
}

function saveToLocalStorage(){

}

function renderMovie (){    
    moviesListNode.innerHTML = "";
    movieList.forEach((movie) => {
        const movieItem = document.createElement("li");
        const movieCheckbox = document.createElement("div");
        const movieTitle = document.createElement("p");
        const movieCloseBtn = document.createElement("button");
        const movieCloseBtnImg = document.createElement("img");

        movieItem.id = movie.id;
        //Формируем CSS класс 
        const cssClassMovie = movie.done ? "movies__item movies__item-check": "movies__item";    
        movieItem.className = cssClassMovie;
        movieItem.setAttribute("data-action", "done");
        
        //Формируем CSS класс
        const cssClassMovieIndication = movie.done ? "movies__item-indication movies__item-indication-used": "movies__item-indication";
        movieCheckbox.className = cssClassMovieIndication;
        movieTitle.className = "movies__item-name";
        movieCloseBtn.className = "movies__item-close-btn";
        movieCloseBtn.setAttribute("data-action", "delete");

        movieTitle.innerText = movie.name;
        movieCloseBtnImg.src = "./resourses/close.png";
        movieCloseBtnImg.alt = "x";

        moviesListNode.appendChild(movieItem);
        movieItem.appendChild(movieCheckbox);
        movieItem.appendChild(movieTitle);      
        movieItem.appendChild(movieCloseBtn);         
        movieCloseBtn.appendChild(movieCloseBtnImg);        
    })
    //добавляем валидацию   
    validationMessageNode.classList.remove ("movies__validationMessage_hidden"); 
    movieAddButtonNode.setAttribute("disabled", "true");    
}

function saveToLocalStorage () {
    localStorage.setItem('movieList', JSON.stringify(movieList));
}


function validation(){
    //вычисление длины введенных значений    
    const titleValue = movieInputNode.value; 
    // пограничные условия
    if (titleValue.trim() === ""){        
        validationMessageNode.classList.remove ("movies__validationMessage_hidden"); 
        movieAddButtonNode.setAttribute("disabled", "true");        
        return
    }
    validationMessageNode.classList.add ("movies__validationMessage_hidden"); // добавляем класс validationMessage_hidden (скрываем надпись)
    movieAddButtonNode.removeAttribute("disabled");  // удаляем атрибут disabled 
} 