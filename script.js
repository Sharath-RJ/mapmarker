// Initialize the map
var currentlatitude=30.7046 // default latitude
var currentlongitude = 76.7179 // default longitude

let map = L.map("map").setView([currentlatitude, currentlongitude], 12)

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map)

// Store markers
let markers = []
let markerCounter = 1


 // Custom marker icons using Font Awesome
const markerIcons = {
    blue: L.divIcon({
        html: '<i class="fa-solid fa-location-dot" style="color: #3388ff; font-size: 24px;"></i>',
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    }),
    red: L.divIcon({
        html: '<i class="fa-solid fa-location-dot" style="color: #ff4444; font-size: 24px;"></i>',
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    }),
    green: L.divIcon({
        html: '<i class="fa-solid fa-location-dot" style="color: #44ff44; font-size: 24px;"></i>',
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    }),
    orange: L.divIcon({
        html: '<i class="fa-solid fa-location-dot" style="color: #ff8844; font-size: 24px;"></i>',
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    }),
    purple: L.divIcon({
        html: '<i class="fa-solid fa-location-dot" style="color: #8844ff; font-size: 24px;"></i>',
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    }),
}





// Click event to add markers
map.on("click", function (e) {
    console.log("triggered.....")
    const lat = e.latlng.lat.toFixed(4)
    const lng = e.latlng.lng.toFixed(4)

    document.getElementById("lat").value = lat
    document.getElementById("lng").value = lng
    document.getElementById("title").value = `Location ${markerCounter}`
    document.getElementById("description").value = `Clicked at ${lat}, ${lng}`
})

function addMarker() {
    const lat = parseFloat(document.getElementById("lat").value)
    const lng = parseFloat(document.getElementById("lng").value)
    const title =
        document.getElementById("title").value || `Marker ${markerCounter}`
    const description =
        document.getElementById("description").value || "No description"
    const color = document.getElementById("color").value

    if (isNaN(lat) || isNaN(lng)) {
        alert("Please enter valid coordinates")
        return
    }

    addMarkerToMap(lat, lng, title, description, color)

    // Clear form
    document.getElementById("title").value = ""
    document.getElementById("description").value = ""
}

function addMarkerToMap(lat, lng, title, description, color) {
    const marker = L.marker([lat, lng], {
        icon: markerIcons[color],
    }).addTo(map)

marker.bindPopup(`
  <div style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    width: 240px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    background: #1e1e1e;
    border: 1px solid #242424;
  ">
    
    <!-- Header Section -->
    <div style="
      display: flex;
      align-items: center;
      padding: 12px;
      background: #567a4d;
      color: white;
    ">
      <img src="https://via.placeholder.com/40" alt="Profile"
           style="
             width: 40px;
             height: 40px;
             border-radius: 50%;
             margin-right: 10px;
             object-fit: cover;
             border: 2px solid rgba(255,255,255,0.2);
           ">
      <div style="flex: 1; min-width: 0;">
        <div style="
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">John Doe</div>
        <div style="
          font-size: 11px;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">Plumber • Electrician</div>
      </div>
    </div>
    
    <!-- Content Section -->
    <div style="padding: 12px; background: #1e1e1e;">
      
      <!-- Service Areas - Compact -->
      <div style="margin-bottom: 10px;">
        <div style="
          font-size: 10px;
          font-weight: 500;
          color: #6e6e6e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        ">Coverage</div>
        <div style="
          color: #cdcdcd;
          font-size: 12px;
          line-height: 1.3;
        ">Kochi, Trivandrum, Calicut</div>
      </div>
      
      <!-- Rating - Inline -->
      <div style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid #242424;
      ">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span style="color: #567a4d; font-size: 12px;">★★★★☆</span>
          <span style="color: #cdcdcd; font-size: 12px; font-weight: 500;">4.0</span>
        </div>
        <span style="
          font-size: 10px;
          color: #6e6e6e;
        ">127 reviews</span>
      </div>
      
      <!-- Actions - Compact -->
      <div style="display: flex; gap: 6px;">
        <button onclick="openDirections(${lat}, ${lng})"
               style="
                 flex: 1;
                 background: #567a4d;
                 color: white;
                 border: none;
                 font-weight: 500;
                 font-size: 11px;
                 padding: 8px 10px;
                 border-radius: 4px;
                 cursor: pointer;
                 transition: background-color 0.2s ease;
               "
               onmouseover="this.style.background='#4d6c46'"
               onmouseout="this.style.background='#567a4d'">
          🚗 Directions
        </button>
        <button onclick="contactProvider()"
               style="
                 background: transparent;
                 color: #cdcdcd;
                 border: 1px solid #242424;
                 font-weight: 500;
                 font-size: 11px;
                 padding: 8px 12px;
                 border-radius: 4px;
                 cursor: pointer;
                 transition: all 0.2s ease;
               "
               onmouseover="this.style.borderColor='#567a4d'; this.style.color='#567a4d'"
               onmouseout="this.style.borderColor='#242424'; this.style.color='#cdcdcd'">
          📞
        </button>
      </div>
      
    </div>
  </div>
`)

let hoverTimeout
let popupOpen = false
let hoveringPopup = false

// When mouse enters the marker
marker.on("mouseover", function (e) {
    clearTimeout(hoverTimeout)
    if (!popupOpen) {
        hoverTimeout = setTimeout(() => {
            this.openPopup()
            popupOpen = true
        }, 300) // Open after 300ms delay
    }
})

// When mouse leaves the marker
marker.on("mouseout", function (e) {
    clearTimeout(hoverTimeout)
    // Only start close timeout if not hovering over the popup
    if (!hoveringPopup) {
        hoverTimeout = setTimeout(() => {
            if (popupOpen && !hoveringPopup) {
                this.closePopup()
                popupOpen = false
            }
        }, 500) // Close after 500ms delay
    }
})

// When popup opens, track mouse events on it
marker.on("popupopen", function () {
    const popupElement = this.getPopup().getElement()

    // When mouse enters the popup
    popupElement.addEventListener("mouseenter", function () {
        hoveringPopup = true
        clearTimeout(hoverTimeout)
    })

    // When mouse leaves the popup
    popupElement.addEventListener("mouseleave", function () {
        hoveringPopup = false
        hoverTimeout = setTimeout(() => {
            if (popupOpen) {
                marker.closePopup()
                popupOpen = false
            }
        }, 300)
    })
})

// When popup closes, reset state
marker.on("popupclose", function () {
    popupOpen = false
    hoveringPopup = false
    clearTimeout(hoverTimeout)
})

// Keep click functionality for mobile/touch devices
marker.on("click", function (e) {
    this.openPopup()
    popupOpen = true
})

    const markerData = {
        id: markerCounter,
        marker: marker,
        lat: lat,
        lng: lng,
        title: title,
        description: description,
        color: color,
    }

    markers.push(markerData)
    markerCounter++

  //  updateMarkersList()
}

function removeMarker(id) {
    const index = markers.findIndex((m) => m.id === id)
    if (index > -1) {
        map.removeLayer(markers[index].marker)
        markers.splice(index, 1)
     //   updateMarkersList()
    }
}

function focusMarker(id) {
    const markerData = markers.find((m) => m.id === id)
    if (markerData) {
        map.setView([markerData.lat, markerData.lng], 15)
        markerData.marker.openPopup()
    }
}

function clearAllMarkers() {
    markers.forEach((markerData) => {
        map.removeLayer(markerData.marker)
    })
    markers = []
    markerCounter = 1
   // updateMarkersList()
}

function updateMarkersList() {
    const listContainer = document.getElementById("markersList")

    if (markers.length === 0) {
        listContainer.innerHTML =
            '<p style="color: #6c757d; font-style: italic;">No markers added yet</p>'
        return
    }

    listContainer.innerHTML = markers
        .map(
            (markerData) => `
                <div class="marker-item">
                    <div class="marker-info">
                        <strong>${markerData.title}</strong>
                        <div class="marker-coords">${markerData.lat}, ${markerData.lng}</div>
                        <div style="font-size: 14px; color: #495057;">${markerData.description}</div>
                    </div>
                    <div>
                        <button class="btn btn-small" onclick="focusMarker(${markerData.id})">Focus</button>
                        <button class="btn btn-danger btn-small" onclick="removeMarker(${markerData.id})">Remove</button>
                    </div>
                </div>
            `
        )
        .join("")
}
// 🔹 Add click event to open Google Maps directions
function openDirections(lat, lng) {
    const destination = `${lat},${lng}`
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`
    window.open(mapsUrl, "_blank")
}

// Add some sample markers for demonstration

        setTimeout(() => {
            addMarkerToMap(30.7400, 76.7800, 'Sample Location 1', 'This is a sample red marker', 'red');
            addMarkerToMap(30.7300, 76.7850, 'Sample Location 2', 'This is a sample green marker', 'green');
            addMarkerToMap(30.7380, 76.7750, 'Sample Location 3', 'This is a sample orange marker', 'orange');
        }, 1000);


// ✅ Listen for messages from Angular
window.addEventListener("message", (event) => {
 

    if (event.data.type === "SET_LATLNG") {
        const { lat, lng, head, desc } = event.data;
        console.log("Received coordinates from Angular:", lat, lng);

        // Update hidden controls
      let latitude =  document.getElementById("lat").value = lat;
      let longitude =  document.getElementById("lng").value = lng;
      let title  =   document.getElementById("title").value = head || `Marker from Angular`;
      let description = (document.getElementById("description").value = desc ||`Sent via postMessage`)

        
       
        addMarkerToMap(
            latitude,
            longitude,
            title,
            description,
            "blue"
        )

    }

    if(event.data.type=="CURRENT_LOCATION"){
         const { lat, lng } = event.data;
        console.log("Received coordinates from Angular:", lat, lng);

        // Update hidden controls
       currentlatitude =  document.getElementById("lat").value = lat;
       currentlongitude =  document.getElementById("lng").value = lng;
    
    }
});
