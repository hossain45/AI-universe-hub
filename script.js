let getData = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
  const data = await response.json();
  const aiTools = data.data.tools;
  // console.log(aiTools);
  displayTools(aiTools)

}

let visit = (url) => {
  console.log('clicked');
  window.open(url, '_blank');
}

let displayTools = aiTools => {
  // console.log(aiTools);
  let toolsContainer = document.getElementById('tools-container')
  //create element
  aiTools.forEach(element => {
    console.log(element);    

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
    // console.log(url);
    
    toolsCard.innerHTML = `
      <figure class="p-4">
        <img src="${element.image}" alt="" class="h-[300px] rounded-lg"/>
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
            <button id="try-btn" class="btn btn-primary type="button"  onclick="visit('${url}')">Try Now</button>
          </div>
        </div>
      </div>
      </div>
    `
    toolsContainer.appendChild(toolsCard);
  });  
}
getData();