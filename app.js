const searchSongs = ()=>{
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
   fetch(url)
   .then(res=>res.json())
   .then(data=>displaySongs(data.data))
   //error catch korte chaile
  //  .catch(error=>displayError('Something went wrong!! Please try again later.'));
}
const searchButton = document.getElementById('searchBtn');
document.getElementById('search-field')
.addEventListener("keypress", function(event){

  if(event.key=='Enter')
  {
    searchButton.click();

  }
 


});

// const searchSongs = async()=>{
//   const searchText = document.getElementById('search-field').value;
//   const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//  const res = await fetch(url)
//  const data = await res.json();
//  displaySongs(data.data);

// }

const displaySongs=songs=>{
    const songContainer =document.getElementById('songContainer');
    songContainer.innerHTML='';
  songs.forEach(song=>{

    const songDiv = document.createElement('div');
    songDiv.className ="single-result row align-items-center my-3 p-3"
   songDiv.innerHTML= ` <div class="col-md-9">
   <h3 class="lyrics-name">${song.title}</h3>
   <p class="author lead">Album by <span>${song.artist.name}</span></p>
   <audio controls>
   <source src ="${song.preview}" type ="audio/mpeg">

   </audio>
</div>
<div class="col-md-3 text-md-right text-center">
   <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
</div>`;
    songContainer.appendChild(songDiv);

toggleSpinner();
  });
}
// const getLyrics = (artist, title)=>{
//     const url =` https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res=>res.json())
//     .then(data=>displayLyrics(data.lyrics));
// }

//erro hole async await a
// const getLyrics = async(artist, title)=>{
//   const url =` https://api.lyrics.ovh/v1/${artist}/${title}`;
// try{
//   const res = await fetch(url);
//   const data=await res.json()
//   displayLyrics(data.lyrics);

// }
// catch(error){
//  displayError('Sorry I failed to load lyrics!! Please try again later.');
// }
// }

const getLyrics = async(artist, title)=>{
  const url =` https://api.lyrics.ovh/v1/${artist}/${title}`;

  const res = await fetch(url);
  const data=await res.json()
  displayLyrics(data.lyrics);


}

const displayLyrics =lyrics=>{
 
  const songDiv = document.getElementById('songLyrics');
  songDiv.innerText= lyrics;
}

const displayError =error=>{
  const errorTag = document.getElementById('error-message');
  errorTag.innerText=error;
}

const toggleSpinner =(show)=>{
  const spinner = document.getElementById('loading-spinner');
  const songs = document.getElementById('songContainer');
  spinner.classList.toggle('d-none');
  songs.classList.toggle('d-none');

  // if(show)
  // {
  //   spinner.classList.remove('d-none');
  // }
  // else{
  //   spinner.classList.add('d-none');
  // }

}