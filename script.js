let sortBtn = document.getElementById('sort');
let seeMoreBtn = document.getElementById('see-more');
let aiTools = [];
let aiToolsDisplay = [];

let getData = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await response.json();
  aiTools = data.data.tools;
  // initially display 6 tools
  aiToolsDisplay = aiTools.slice(0,6);
  displayTools(aiToolsDisplay)
}

// function for try now button 
let visit = (url) => {
  console.log('clicked');
  window.open(url, '_blank');
}
// function for see more button 
let seeMore = () => {
  aiToolsDisplay = aiTools;
  displayTools(aiToolsDisplay);
  seeMoreBtn.classList.add('hidden')
}
// function for sort button 
sortBtn.addEventListener('click', () => {
  aiToolsDisplay.sort((a, b) => {
    let dateA = new Date(a.published_in);
    let dateB = new Date(b.published_in);
    return dateA - dateB;
  })
  // return aiTools
  displayTools(aiToolsDisplay);
})

// main function to display
let displayTools = aiTools => {
  let toolsContainer = document.getElementById('tools-container')
  //clearing before taking another action
  toolsContainer.innerHTML = '';
  //create element
  aiTools.forEach(element => {
    let toolsCard = document.createElement('div');
    toolsCard.classList = 'card card-compact bg-gray-100 shadow-xl w-96';

    let toolFeatures = () => {
      let featuresList = '';
      let i = 1;
      element.features.forEach(feature => {
        featuresList += `<li>${i}. ${feature}</li>`;  
        i++;      
      });
      return featuresList;
    }

    let url = element.links[0].url
    toolsCard.innerHTML = `
      <figure class="p-4">
        <img src="${element.image ? element.image : 'image404.png'}" alt="${element.image?'':'Image not found'}" class="h-[300px] rounded-lg"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">Features</h2>
        <ul>
          ${toolFeatures()}
        </ul>
        <div class="divider"></div> 
        <div class="flex flex-row justify-between items-center">
        <div>
          <h2 class="card-title">${element.name}</h2>
          <p>${element.published_in}</p>
        </div>
        <div>
          <div class="card-actions justify-center">
            <button id="try-btn" class="btn btn-primary" type="button"  onclick="visit('${url}')">Try Now</button>
          </div>
        </div>
      </div>
      </div>
    `
    toolsContainer.appendChild(toolsCard);
  });  
};

getData();