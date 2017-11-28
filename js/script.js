const searchInput =  document.querySelector('.search-form__input'),
      searchBtn   =  document.querySelector('.search-form__btn');
const popularBtn  =  document.querySelector('.category__popular'),
      latestBtn   =  document.querySelector('.category__latest'),
      topBtn      =  document.querySelector('.category__top'),
      gallery     =  document.querySelector('.output-gallery'),
      err         =  document.querySelector('#err');
const apiKey  = 'api_key=f24a0fd18f52218851075901c5a108a0',
      page    = '&page=1';
const searchByNameUrl   = `https://api.themoviedb.org/3/search/movie?${apiKey}`,
      searchPopularUrl  = `https://api.themoviedb.org/3/movie/popular?${apiKey}`,
      searchLatestUrl   = `https://api.themoviedb.org/3/movie/latest?${apiKey}`,
      searchTopUrl      = `https://api.themoviedb.org/3/movie/top_rated?${apiKey}`;

const clearGallery = () => {
    document.querySelectorAll('.movie-elem').forEach((elem) => {
        elem.remove();
    });
}

const searchByName = (urlValue, page = '', query = 'movie') => {
  let url = `${urlValue}${page}${query}`;
  clearGallery();
  err.innerHTML = '';
    if (searchInput.value == ''){
      alert('Please, fill the search input');
    }
  return fetch(url)
     .then(response => {
    if (response.ok) {
      return response.json();
         }   
     throw new Error(response.statusText);
    })
    .then(data => {
       if (data.results.length > 0) {
      let htmlCard = '';
      const video  = data.results;
        video.forEach(elem => {
          let overview =elem.overview.slice(0,99);
            htmlCard += `<div class="movie-elem">
             <img src="https://image.tmdb.org/t/p/w500${elem.poster_path}" alt="film-poster" class="film-card__img">
             <h3 class="movie-elem__name">${elem.title}</h3>
             <p class="movie-elem__release">${elem.release_date}</p>
             <p class="movie-elem__description">${overview}...</p>
             <div class="movie-elem__rate">${elem.vote_average}</div>
            </div>`;
           });
       gallery.innerHTML = htmlCard;
        }else{
          alert(`No result for your search ${searchInput.value}`);
        }
    })
    .catch(error => {err.innerHTML = `Have no result of search: ${searchInput.value}`;
    console.log(error);
    });
    searchInput.value = ''; 
};

searchBtn.addEventListener("click", (e) => {
    searchByName(searchByNameUrl, '' , `&query=${searchInput.value}`);
    });
popularBtn.addEventListener("click", (e) => {
    searchByName(searchPopularUrl, page, ``);
    });
latestBtn.addEventListener("click", (e) => {
    searchByName(searchLatestUrl, page, ``);
    });
topBtn.addEventListener("click", (e) => {
    searchByName(searchTopUrl, page, ``);
    });