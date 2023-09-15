const inputNode = document.getElementById("moviesFormInput");
const movieAddButtonNode = document.getElementById("movieAddButton");
const moviesListNode = document.getElementById("movieslist");

let movieList = [];

//--------------------
//Функции
//--------------------

//Функция получения введеного наименования фильма
const getMovieName = () => {
    const input = inputNode.value; 
    return input;
}

// Функция очистки поля input
const clearInput = () => {
    inputNode.value ="";
}

//Функция создания объекта с наименованием фильма

const createMovie = (movieName,movieActive) =>{     
    const movie = {
        title: movieName,
        active: movieActive,
    }
    movieList.push(movie); 
    render(movieList);  
    
         
   // return (movie);      
}

//Функция рендера

const render = (movieList) => {
    moviesListNode.innerHTML = "";
    movieList.forEach((movie) => {
        const movieItem = document.createElement("li");
        const movieCheckbox = document.createElement("div");
        const movieTitle = document.createElement("p");
        const movieCloseBtn = document.createElement("button");
        const movieCloseBtnImg = document.createElement("img");

        movieItem.className = "movies__item JS-movie-item";
        movieCheckbox.className = "movies__item-indication";
        movieTitle.className = "movies__item-name";
        movieCloseBtn.className = "movies__item-close-btn";

        movieTitle.innerText = movie.title;
        movieCloseBtnImg.src = "./resourses/close.png";
        movieCloseBtnImg.alt = "x";

        moviesListNode.appendChild(movieItem);
        movieItem.appendChild(movieCheckbox);
        movieItem.appendChild(movieTitle);      
        movieItem.appendChild(movieCloseBtn);         
        movieCloseBtn.appendChild(movieCloseBtnImg);         

        movieItem.addEventListener("click", function(){
            if (movie.active === false){
                movie.active = true;
                movieItem.classList.remove("movies__item-check");
                movieCheckbox.classList.remove("movies__item-indication-used");
                
            }
            else {
                movie.active = false;
                movieItem.classList.add("movies__item-check");
                movieCheckbox.classList.add("movies__item-indication-used");
                return (movie.active);
            }  
                   
        }) 

        console.log(movie.active); 
  
        
    });
}

//обработчик событий
const addBtnHandler = () => {
    const movieName = getMovieName();
    clearInput();
    createMovie(movieName);
    render(movieList);
}

// слушатель событий
movieAddButtonNode.addEventListener('click', addBtnHandler);
