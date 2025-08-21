// Initialize the map


let map = L.map("map", {
    dragging: true, 
    zoomControl: false,
    scrollWheelZoom: true, 
})

// Add tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map)

// Set initial center
map.setView([30.7333, 76.7794], 13)



// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map)


// Get accurate location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      console.log("Accurate Location:", lat, lng)

      // Center map on exact location
      map.setView([lat, lng], 14)

      // Add marker at user’s location
     const currentMarker = L.marker([lat, lng], { icon: markerIcons.greenPulse }).addTo(map)

currentMarker.bindPopup(
    `
  <span style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #333;
  ">You are here</span>
`,
    { closeButton: false, autoClose: false }
)

currentMarker.on("mouseover", function () {
  this.openPopup()
})
currentMarker.on("mouseout", function () {
  this.closePopup()
})


    },
    (error) => {
      console.error("Geolocation error:", error.message)

      // Fallback if user denies location
      map.setView([30.7333, 76.7794], 12)
      L.marker([30.7333, 76.7794], { icon: markerIcons.greenPulse })
          .addTo(map)
          .bindPopup(
              ` <span style="
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #333;
  ">You are here</span>`,
              {
                  closeButton: false,
                  autoClose: false,
              }
          )
          .openPopup()
    }
  )
} else {
  alert("Geolocation is not supported by this browser.")
}

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
    greenPulse: L.divIcon({
        html: `
      <div class="pulse-marker">
        <div class="pulse-ring"></div>
        <div class="pulse-dot"></div>
      </div>
    `,
        className: "custom-marker",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
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

    addLawfirmMarkerToMap(lat, lng, title, description, color)

    // Clear form
    document.getElementById("title").value = ""
    document.getElementById("description").value = ""
}

function addLawfirmMarkerToMap(lat, lng, lawfirmName, lawfirmCity, lawfirmState, color) {
    const marker = L.marker([lat, lng], {
        icon: markerIcons[color],
    }).addTo(map)

    marker.bindPopup(
        `
        <div style="
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 220px;
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
                <div style="
                    width: 36px;
                    height: 36px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                    font-size: 16px;
                ">⚖️</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="
                        font-weight: 600;
                        font-size: 14px;
                        margin-bottom: 2px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    ">${lawfirmName}</div>
                    <div style="
                        font-size: 11px;
                        opacity: 0.9;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    ">Law Firm</div>
                </div>
            </div>
            
            <!-- Content Section -->
            <div style="padding: 12px; background: #1e1e1e;">
                
                <!-- Location -->
                <div style="margin-bottom: 12px;">
                    <div style="
                        font-size: 10px;
                        font-weight: 500;
                        color: #6e6e6e;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 4px;
                    ">Location</div>
                    <div style="
                        color: #cdcdcd;
                        font-size: 12px;
                        line-height: 1.3;
                    ">${lawfirmCity},${lawfirmState}</div>
                </div>
                
                <!-- Actions -->
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
                        🚗 Get Directions
                    </button>
                   
                </div>
                
            </div>
        </div>
    `,
        { closeButton: false, autoClose: false }
    )

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









function addLawyerMarkerToMap( lat, lng,lawyerName,lawyerCity,lawyerRating,color){
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
        ">${lawyerName}</div>
        <div style="
          font-size: 11px;
          opacity: 0.9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        ">Lawyer</div>
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
        ">${lawyerCity}</div>
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
        
        <span style="
          font-size: 10px;
          color: #6e6e6e;
        ">${lawyerRating} reviews</span>
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

       


// ✅ Listen for messages from Angular
window.addEventListener("message", (event) => {
 

    if (event.data.type === "SET_LATLNG_LAWFIRM") {
        const { lat, lng, name, city, state } = event.data
      

        // Update hidden controls
        let latitude = (document.getElementById("lat").value = lat)
        let longitude = (document.getElementById("lng").value = lng)
        let lawfirmName = name || "not specified"
        let lawfirmCity = city || "not specified"
        let lawfirmState = state || "not specified"

        addLawfirmMarkerToMap(
            latitude,
            longitude,
            lawfirmName,
            lawfirmCity,
            lawfirmState,
            "blue"
        )
    }

     if (event.data.type === "SET_LATLNG_LAWYER") {
         const { lat, lng, name, city, rating } = event.data
       

         // Update hidden controls
         let latitude = (document.getElementById("lat").value = lat)
         let longitude = (document.getElementById("lng").value = lng)
         let lawyerName = name || "not specified"
         let lawyerCity = city || "not specified"
         let lawyerRating = rating || 0

         addLawyerMarkerToMap(
             latitude,
             longitude,
             lawyerName,
             lawyerCity,
             lawyerRating,
             "red"
         )
     }

   
});
