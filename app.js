const key = 'at_hMi6gGEpBuvpZYlyePqctRO4xn16O';

const geoForm = document.querySelector('form');
const map = document.querySelector('.map');
const ip = document.querySelector('.ip');
const loca = document.querySelector('.location');
const timeZone= document.querySelector('.timezone')
const isp= document.querySelector('.isp')
var LeafIcon = L.Icon.extend({
   options: {
      iconSize:     [45, 45],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
   }
});
var greenIcon = new LeafIcon({
   iconUrl: './images/pin.png',
  
})

let mymap = L.map('mapid').setView([51.505, -0.09], 13);
let marker = L.marker([51.5, -0.09],{icon: greenIcon}).addTo(mymap);



//////MAP
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2xpY2Vjb2RlIiwiYSI6ImNrZXl0bGlqbTB4NmIyd21mZ2l1anFjYnMifQ.SfERDku9wgZ3nxeancfgqA'
}).addTo(mymap);






// UPDATE UI

function updateUI(data) {
   const ipDets = data.ipDets;
   let lat = data.ipDets.location.lat;
   let lon = data.ipDets.location.lng;
  
  
   ip.innerHTML =
      `  <h4 class="ip">${ipDets.ip}</h4>`;
   loca.innerHTML =
      `  <h4 class="location">${ipDets.location.city},  ${ipDets.location.region}, ${ipDets.location.country}</h4>`;
   timeZone.innerHTML =
      `  <h4 class="ip">${ipDets.location.timezone}</h4>`;
   isp.innerHTML =
      `  <h4 class="ip">${ipDets.isp}</h4>`;

      
    mymap.setView([lat,lon],13)

    let marker = L.marker([lat, lon],{icon: greenIcon}).addTo(mymap);
}



// GET DATA
getGeo = async(ip) =>{
 
   const base = 'https://geo.ipify.org/api/v1';
   const query = `?apiKey=${key}&ipAddress=${ip}`;

   const response = await fetch(base + query);
   const data = await response.json();

   
   return data;
  
 
};


getGeo('  ')
.then(data=> console.log(data))
.catch(err => console.log('no no'));


const updateIp = async (ip)=>{

   const ipDets = await getGeo(ip);
  
  
   return{
      ipDets: ipDets,
     
   }
  
} 

//SUBMIT E
geoForm.addEventListener('submit' ,e =>{
   e.preventDefault();

  
  const ip = geoForm.ip.value.trim();
  geoForm.reset();

  updateIp(ip)
  .then(data => updateUI(data))
  .catch(err =>console.log(err))
});




