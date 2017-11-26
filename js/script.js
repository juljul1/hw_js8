const searchForm  =  document.querySelector('.search-form'),
      searchInput =  document.querySelector('.search-form__input'),
      searchBtn   =  document.querySelector('.search-form__btn'),

      popularBtn =  document.querySelector('.category__popular'),
      latestBtn  =  document.querySelector('.category__latest'),
      topBtn     =  document.querySelector('.category__top'),
      
      gallery    =  document.querySelector('.output-gallery'),
      
      apiKey  = 'api_key=f24a0fd18f52218851075901c5a108a0',
      page    = '&page=1',
      
      searchByNameUrl   = `https://api.themoviedb.org/3/search/movie?${apiKey}`,
      searchPopularUrl  = `https://api.themoviedb.org/3/movie/popular?${apiKey}`,
      searchLatestUrl   = `https://api.themoviedb.org/3/movie/latest?${apiKey}`,
      searchTopUrl      = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`;

const readSerchRes = (rateText, posterSrc, videoName, about, release) => {
    let div         = document.createElement('div'),
        rate        = document.createElement('p'),
        poster      = document.createElement('img'),
        movieName   = document.createElement('p');
        description = document.createElement('p'),
        releaseDate =     document.createElement('p');
    
    div.className  = 'movie-elem';
    rate.className = 'movie-elem__rate';
    rate.innerHTML = `<b>${rateText}</b>`;

    poster.className = 'movie-elem__poster';
    poster.src       = `https://image.tmdb.org/t/p/w500/${posterSrc}`;

    movieName.innerHTML = videoName;
    movieName.className = 'movie-elem__name'

    description.className = 'movie-elem__description';
    description.innerHTML = `${about.slice(0, 99)}`;

    releaseDate.className = 'movie-elem__release';
    releaseDate.innerHTML = `Release: ${release}`;

    div.appendChild(rate);
    div.appendChild(poster);
    div.appendChild(movieName)
    div.appendChild(description);
    div.appendChild(releaseDate);
    gallery.appendChild(div);
}

const clearGallery = () => {
    document.querySelectorAll('.movie-elem').forEach((elem) => {
        elem.remove();
    });
}

const SearchByName = (urlValue, page = '', query = 'movie') => {
      url = `${urlValue}${page}${query}`;
  clearGallery();
  searchInput.value = ''; err.innerHTML = '';

  return fetch(url)
     .then(response => {
    if (response.ok) {
      return response.json();
         }   
     throw new Error(response.statusText);
    })
    
    .then(data => {
      if (data.results != undefined) {
        const video = data.results;
        video.forEach(function(elem){readSerchRes(elem.vote_average, elem.poster_path, elem.title, elem.overview, elem.release_date)});
      }else{
               readSerchRes(data.vote_average, data.poster_path, data.title, data.overview, data.release_date);
        }
    })
    .catch(error => {err.innerHTML = `Have no result of search: ${searchInput.value}`;
    });
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    SearchByName(searchByNameUrl, '' , `&query=${searchInput.value}`);
    });
popularBtn.addEventListener("click", (e) => {
    e.preventDefault();
    SearchByName(searchPopularUrl, page, ``);
    });
latestBtn.addEventListener("click", (e) => {
    e.preventDefault();
    SearchByName(searchLatestUrl, page, ``);
    });
topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    SearchByName(searchTopUrl, page, ``);
    });