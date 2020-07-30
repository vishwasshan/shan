// $(document).ready(() => {
//   $('#searchForm').on('submit', (e) => {
//     let searchText = $('#searchText').val()


//     getMovies(searchText);
//     e.preventDefault();
//   });
// });

let ClickedText=document.getElementById("searchText");
ClickedText.addEventListener("keyup", function(){
  let val=ClickedText.value;
  console.log(val)
  getMovies(val);
})




function getMovies(searchText){
  axios.get('http://www.omdbapi.com?s='+ searchText+'&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
        <div class="card">
          <div class="card-body">
           <div id="imgdiv">
               <img id="img" src="${movie.Poster}">
           </div>
          </div>
          <div class="card-footer">
            <h5>${movie.Title}</h5>
            <a id="button" onclick="movieSelected('${movie.imdbID}')"  class="btn btn-outline-primary" href="#">Movie Details</a>
          </div>
        </div>
        </div>


        
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row">

        <div class="card">
          <div class="card-body" style="padding:0">
            <div id="imageContainer2">
            <img id="imgg" src="${movie.Poster}" class="thumbnail">
            </div>
          </div> 
        </div> 
        
        
  
         
         
          <div class="col-md-8" style="margin-top:1%; margin-left:5%">
          <div class="card">
             <div class="card-title">
                  <h2 id="heading">${movie.Title}</h2>
             </div>
             <div class="card-body" id="MovieCard">
                 <p class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</p>
                 <p class="list-group-item"><strong>Released:</strong> ${movie.Released}</p>
                 <p class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</p>
                 <p class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
                 <p class="list-group-item"><strong>Director:</strong> ${movie.Director}</p>
                 <p class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</p>
                 <p class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</p> 
           </div>
          </div>
        </div>
      </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
