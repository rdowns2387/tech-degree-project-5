const gallery = document.getElementById('gallery');
const modal = document.querySelector('.modal-container');
let userArray = [];

fetch('https://randomuser.me/api/?nat=us&results=12&inc=gender,name,email,picture,location,cell,dob')
  .then(response => response.json())
  .then(data => generateUsers(data.results))
  .then(generateModal)
  .then(user => userModal(user))
  .then(searchBar);

// GENERATE CARDS
function generateUsers(data){
  //push fetched data into an array
  data.map( user => userArray.push(user));
  console.log(userArray);

  //map over the array and generate html for each user
  const html = userArray.map(user =>`
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first + " " + user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city + ", " + user.location.state}</p>
        </div>
    </div>
  `).join('');

  //add html to page
  gallery.innerHTML = html;
}

// GENERATE MODAL
function generateModal(){
  let modalHtml = `
  <div class="modal-container">
      <div class="modal"></div>
      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
  </div>
  `;
  // add the modal structure HTML to the page
  gallery.innerHTML += modalHtml;
  document.querySelector('.modal-container').style.display = 'none';
}

// POPULATE MODAL, PREV & NEXT BUTTONS, CLOSE MODAL
function userModal(user){

  //get my variables
  let modalContainer = document.querySelector('.modal-container');
  let modalData = document.querySelector('.modal');
  let nextButton = document.getElementById('modal-next');
  let prevButton = document.getElementById('modal-prev');

  let cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', function(e){
      let modalHtml = `
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${userArray[i].picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${userArray[i].name.first + " " + userArray[i].name.last}</h3>
          <p class="modal-text">${userArray[i].email}</p>
          <p class="modal-text cap">${userArray[i].location.city + ", " + userArray[i].location.state}</p>
          <hr>
          <p class="modal-text">${userArray[i].cell}</p>
          <p class="modal-text">${userArray[i].location.street + ", " +userArray[i].location.city + ", " + userArray[i].location.state + " "+userArray[i].location.postcode}</p>
          <p class="modal-text">Birthday: ${userArray[i].dob.date.charAt(5)+userArray[i].dob.date.charAt(6)+"/"+userArray[i].dob.date.charAt(8)+userArray[i].dob.date.charAt(9)+"/"+userArray[i].dob.date.charAt(0)+userArray[i].dob.date.charAt(1)+userArray[i].dob.date.charAt(2)+userArray[i].dob.date.charAt(3)}</p>
        </div>
      `;
      // add the modal info HTML to the page and show the modal
      modalContainer.style.display = 'block';
      modalData.innerHTML += modalHtml;


      nextButton.addEventListener('click', function(){
        modalData.innerHTML = ' ';
        if( i < 11 ){
          i++;
        } else if (i = 11) {
          i = 0
        }
        console.log(i)
          let modalHtml = `
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${userArray[i].picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${userArray[i].name.first + " " + userArray[i].name.last}</h3>
              <p class="modal-text">${userArray[i].email}</p>
              <p class="modal-text cap">${userArray[i].location.city + ", " + userArray[i].location.state}</p>
              <hr>
              <p class="modal-text">${userArray[i].cell}</p>
              <p class="modal-text">${userArray[i].location.street + ", " +userArray[i].location.city + ", " + userArray[i].location.state + " "+userArray[i].location.postcode}</p>
              <p class="modal-text">Birthday: ${userArray[i].dob.date.charAt(5)+userArray[i].dob.date.charAt(6)+"/"+userArray[i].dob.date.charAt(8)+userArray[i].dob.date.charAt(9)+"/"+userArray[i].dob.date.charAt(0)+userArray[i].dob.date.charAt(1)+userArray[i].dob.date.charAt(2)+userArray[i].dob.date.charAt(3)}</p>
            </div>
          `;
        // add the modal HTML to the page
        modalData.innerHTML += modalHtml;
        // hide modal on close modal button click and remove current modal data
        let closeModalBtn = document.getElementById('modal-close-btn');

        closeModalBtn.addEventListener('click', function(){
            console.log('is this click firing?');
            modalContainer.style.display = 'none';
            modalData.innerHTML = '';
        });
      });

      prevButton.addEventListener('click', function(){
        modalData.innerHTML = ' ';
        console.log(i)
        if ( i >= 1){
          i --;
        } else if ( i == 0 ){
          i = 11;
        }

        console.log(i)
          let modalHtml = `
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
              <img class="modal-img" src="${userArray[i].picture.large}" alt="profile picture">
              <h3 id="name" class="modal-name cap">${userArray[i].name.first + " " + userArray[i].name.last}</h3>
              <p class="modal-text">${userArray[i].email}</p>
              <p class="modal-text cap">${userArray[i].location.city + ", " + userArray[i].location.state}</p>
              <hr>
              <p class="modal-text">${userArray[i].cell}</p>
              <p class="modal-text">${userArray[i].location.street + ", " +userArray[i].location.city + ", " + userArray[i].location.state + " "+userArray[i].location.postcode}</p>
              <p class="modal-text">Birthday: ${userArray[i].dob.date.charAt(5)+userArray[i].dob.date.charAt(6)+"/"+userArray[i].dob.date.charAt(8)+userArray[i].dob.date.charAt(9)+"/"+userArray[i].dob.date.charAt(0)+userArray[i].dob.date.charAt(1)+userArray[i].dob.date.charAt(2)+userArray[i].dob.date.charAt(3)}</p>
            </div>
          `;
        // add the modal HTML to the page
        modalData.innerHTML += modalHtml;
        // hide modal on close modal button click and remove current modal data
        let closeModalBtn = document.getElementById('modal-close-btn');

        closeModalBtn.addEventListener('click', function(){
            console.log('is this click firing?');
            modalContainer.style.display = 'none';
            modalData.innerHTML = '';
        });
      });

      // hide modal on close modal button click and remove current modal data
      let closeModalBtn = document.getElementById('modal-close-btn');

      closeModalBtn.addEventListener('click', function(){
          console.log('is this click firing?');
          modalContainer.style.display = 'none';
          modalData.innerHTML = '';
      });
    });
  };
}

// SEARCH FEATURE
function searchBar(){
  let searchHtml = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>
  `;
  document.querySelector('.search-container').innerHTML += searchHtml;
  document.querySelector('#search-input').setAttribute('placeholder','Search by Name');

  document.querySelector('#serach-submit').addEventListener('click', function(event){
    event.preventDefault();
    let searchResult = document.querySelector('#search-input').value;
    console.log(searchResult);

    let cards = document.querySelectorAll('.card');

    for (let i =0; i < cards.length; i++) {
      if (!userArray[i].name.first.includes(searchResult)){
        console.log('its not here!');
        cards[i].classList.add('notFound');
      } else if (userArray[i].name.first.includes(searchResult)){
        cards[i].classList.remove('notFound');

      }

    };
  });
};
