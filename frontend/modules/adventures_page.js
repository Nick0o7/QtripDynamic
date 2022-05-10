import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParam = new URLSearchParams(search);

  return urlParam.get("city");

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try{
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let data = await res.json();
    return data;
  }
  catch{
    return null;
  }

}


//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  let target = document.getElementById("data");
  target.innerHTML = "";

  adventures.forEach(e => {
    let newDivElement = document.createElement("div");
    newDivElement.setAttribute("class", "col-6 col-lg-3 mb-4");
    newDivElement.innerHTML = `<a id="${e.id}" href="detail/?adventure=${e.id}">
                                  <div class="activity-card">
                                  
                                    <img src="${e.image}">
                      
                                    <div class="w-100 p-2 d-flex justify-content-between">
                                      <h6>${e.name}</h6>
                                      <p>₹${e.costPerHead}</p>
                                    </div>
                                    <div class="w-100 p-2 d-flex justify-content-between">
                                      <h6>Duration</h6>
                                      <p>${e.duration}</p>
                                    </div>
                                  </div>
                                  <div class="category-banner">
                                    ${e.category}
                                  </div>
                                </a>`;
    
    
    target.appendChild(newDivElement); 
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 
  let result = list.filter( e=> {
    if(e.duration >= low && e.duration <= high){
      return e;
    }
  });
  
  return result;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

 let filteredList = [];

 for(let i = 0; i < categoryList.length; i++){

  let listElement = list.filter( e => {
    return e.category === categoryList[i];
  });
  
  filteredList.push(...listElement);

 }
 
 return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  let filteredlist = [];
  let categoryList = [];
  let durationList = [];
  let durationArr = filters["duration"].split("-");
  

  if(filters["duration"].length > 0 && filters["category"].length > 0)
  {
    categoryList = filterByCategory(list,filters["category"]);
    durationList = filterByDuration(categoryList,durationArr[0],durationArr[1]);
    filteredlist = [...durationList];
    return filteredlist;
  }
  else if(filters["duration"].length > 0)
  {
    filteredlist = filterByDuration(list,durationArr[0], durationArr[1]);
    return filteredlist;
  }
  else if(filters["category"].length > 0)
  {
    filteredlist = filterByCategory(list,filters["category"]);
    return filteredlist;
  }
  
  
  // Place holder for functionality to work in the Stubs
  return list;
}



//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  return JSON.parse(window.localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  filters["category"].forEach( e => {
    let target = document.getElementById("category-list");
    let pills = document.createElement("div");
    pills.setAttribute("class", "category-filter");
    pills.innerHTML = `${e}`;
    target.appendChild(pills);
  })
 
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
