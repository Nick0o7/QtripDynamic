import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let urlParam = new URLSearchParams(search);

  // Place holder for functionality to work in the Stubs
  return urlParam.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try{
    let output = await fetch(config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId);
    let result = await output.json();
    return result;
  }
  catch{
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  let name = document.getElementById("adventure-name");
  name.innerHTML = `${adventure.name}`;

  let adventureSubtitle = document.getElementById("adventure-subtitle");
  adventureSubtitle.innerHTML = `${adventure.subtitle}`;

  adventure["images"].forEach( e => {
    let target = document.getElementById("photo-gallery");
    let imageDiv = document.createElement('div');
    imageDiv.setAttribute("class", "w-100")

    imageDiv.innerHTML = `<img class="activity-card-image" src="${e}">`;
    target.appendChild(imageDiv);
  })

  let content = document.getElementById("adventure-content");
  content.innerHTML = `${adventure.content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoCarousel = document.getElementById("photo-gallery");

  photoCarousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators" id="indicators">
                                </ol>
                                <div class="carousel-inner" id="carousel-target">
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span class="sr-only">Next</span>
                                </a>
                              </div>`;

  for(let i = 0; i < images.length; i++)
  {

    let target = document.getElementById("carousel-target");
    
    let olElement = document.getElementById("indicators");
    let liElement = document.createElement("li");
    
    liElement.setAttribute("data-target","#carouselExampleIndicators");
    liElement.setAttribute("data-slide-to",i);
    if(i === 0){
      liElement.setAttribute("class","active");
    }
    olElement.appendChild(liElement);
    
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "carousel-item");
    if(i === 0)
    {
      newDiv.setAttribute("class", "carousel-item active");
    }
    newDiv.innerHTML = `<img src="${images[i]}" class="d-block w-100 activity-card-image">`;
    target.appendChild(newDiv)
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available){

    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    
    let costPerHead = document.getElementById("reservation-person-cost");

    costPerHead.innerHTML = `${adventure.costPerHead}`;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let totalAmount  = document.getElementById("reservation-cost");

  totalAmount.innerHTML = persons * adventure.costPerHead;
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  const form = document.getElementById("myForm");

  form.addEventListener("submit", async(event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formELements = form.elements;

    let bodyString = JSON.stringify({
      name: formELements["name"].value,
      date: formELements["date"].value,
      person: formELements["person"].value,
      adventure: adventure.id
    })

    try{
      const res = await fetch(url, {
        method:"POST",
        body:bodyString,
        headers:{
          "Content-Type": "application/json"
        }
      });
      if(res.ok){
          alert("Success!");
          window.location.reload();
      }
      else{
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    }
    catch (err){
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
  
};
