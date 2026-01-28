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

    addLawfirmMarkerToMap(lat, lng, title, description, "", color)

    // Clear form
    document.getElementById("title").value = ""
    document.getElementById("description").value = ""
}

function addLawfirmMarkerToMap(lat, lng, lawfirmName, lawfirmCity, lawfirmState, image, color) {
    const marker = L.marker([lat, lng], {
        icon: markerIcons[color],
    }).addTo(map)

    marker.bindPopup(
        `
        <div style="
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            width: 260px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            background: #ffffff;
            border: none;
        ">
            <!-- Header Section -->
            <div style="
                display: flex;
                align-items: center;
                padding: 16px;
                background: linear-gradient(135deg, #1a365d 0%, #2a4365 100%);
                color: white;
            ">
                <div style="
                    width: 48px;
                    height: 48px;
                    background: white;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    overflow: hidden;
                ">
                    <img src="${image || 'assets/images/logo-default.jpg'}" 
                         style="width: 100%; height: 100%; object-fit: contain; padding: 4px;"
                         onerror="this.src='https://via.placeholder.com/48?text=Firm'">
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="
                        font-weight: 700;
                        font-size: 15px;
                        margin-bottom: 2px;
                        line-height: 1.2;
                    ">${lawfirmName}</div>
                    <div style="
                        font-size: 11px;
                        opacity: 0.85;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        font-weight: 600;
                    ">Established Law Firm</div>
                </div>
            </div>
            
            <!-- Content Section -->
            <div style="padding: 16px; background: #f8fafc;">
                <div style="margin-bottom: 16px; display: flex; align-items: flex-start;">
                    <div style="color: #64748b; margin-right: 10px; font-size: 14px; margin-top: 2px;">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; font-weight: 600; margin-bottom: 2px;">Office Location</div>
                        <div style="color: #334155; font-size: 13px; font-weight: 500;">${lawfirmCity}, ${lawfirmState}</div>
                    </div>
                </div>
                
                <!-- Actions -->
                <div style="display: flex; gap: 8px;">
                    <button onclick="openDirections(${lat}, ${lng})"
                           style="
                             flex: 1;
                             background: #2563eb;
                             color: white;
                             border: none;
                             font-weight: 600;
                             font-size: 12px;
                             padding: 10px;
                             border-radius: 6px;
                             cursor: pointer;
                             display: flex;
                             align-items: center;
                             justify-content: center;
                             gap: 6px;
                             transition: all 0.2s ease;
                             box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
                           "
                           onmouseover="this.style.background='#1d4ed8'; this.style.transform='translateY(-1px)'"
                           onmouseout="this.style.background='#2563eb'; this.style.transform='translateY(0)'">
                        <i class="fas fa-directions"></i> Get Directions
                    </button>
                </div>
            </div>
        </div>
    `,
        { closeButton: true, autoClose: false, className: 'enterprise-popup' }
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
        title: lawfirmName,
        description: `${lawfirmCity}, ${lawfirmState}`,
        image: image,
        color: color,
    }

    markers.push(markerData)
    markerCounter++

    //  updateMarkersList()
}









function addLawyerMarkerToMap(lat, lng, lawyerName, lawyerCity, lawyerRating, image, color) {
    const marker = L.marker([lat, lng], {
        icon: markerIcons[color],
    }).addTo(map)
    marker.bindPopup(`
  <div style="
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    width: 280px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    background: #ffffff;
    border: none;
  ">
    <!-- Profile Header -->
    <div style="
      padding: 20px;
      background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);
      display: flex;
      align-items: center;
      gap: 15px;
    ">
      <div style="position: relative;">
        <img src="${image || 'assets/images/user-dummy.png'}" 
             alt="${lawyerName}"
             style="
               width: 60px;
               height: 60px;
               border-radius: 50%;
               object-fit: cover;
               border: 3px solid rgba(255,255,255,0.2);
               box-shadow: 0 4px 6px rgba(0,0,0,0.1);
             "
             onerror="this.src='https://via.placeholder.com/60?text=Lawyer'">
        <div style="
            position: absolute;
            bottom: 2px;
            right: 2px;
            width: 14px;
            height: 14px;
            background: #48BB78;
            border: 2px solid #2D3748;
            border-radius: 50%;
        "></div>
      </div>
      <div style="flex: 1;">
        <h3 style="
          margin: 0;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
        ">${lawyerName}</h3>
        <span style="
          display: inline-block;
          background: rgba(66, 153, 225, 0.2);
          color: #90CDF4;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          margin-top: 4px;
        ">Verified Legal Expert</span>
      </div>
    </div>
    
    <!-- Info Body -->
    <div style="padding: 20px; background: #ffffff;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
            <div style="font-size: 10px; color: #718096; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">City</div>
            <div style="color: #2D3748; font-size: 13px; font-weight: 600;">${lawyerCity}</div>
        </div>
        <div style="text-align: right;">
            <div style="font-size: 10px; color: #718096; text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Rating</div>
            <div style="display: flex; align-items: center; gap: 4px; color: #2D3748; font-size: 13px; font-weight: 700;">
                <span style="color: #ECC94B;">★</span>
                <span>${lawyerRating} reviews</span>
            </div>
        </div>
      </div>
      
      <!-- Action Footer -->
      <button onclick="openDirections(${lat}, ${lng})"
             style="
               width: 100%;
               background: #3182CE;
               color: white;
               border: none;
               font-weight: 700;
               font-size: 13px;
               padding: 12px;
               border-radius: 8px;
               cursor: pointer;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 8px;
               box-shadow: 0 4px 6px rgba(49, 130, 206, 0.2);
               transition: all 0.2s ease;
               margin-top: 10px;
             "
             onmouseover="this.style.background='#2B6CB0'; this.style.transform='translateY(-1px)'"
             onmouseout="this.style.background='#3182CE'; this.style.transform='translateY(0)'">
        <i class="fas fa-location-arrow"></i> Get Directions to Office
      </button>
    </div>
  </div>
`, { closeButton: true, autoClose: false, className: 'enterprise-popup' })

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
        title: lawyerName,
        description: `${lawyerCity} (Rating: ${lawyerRating})`,
        image: image,
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
        const { lat, lng, name, city, state, image } = event.data
        console.log("Lawfirm data received in mapmicroservice:", { lat, lng, name, city, state, image });
      

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
            image,
            "blue"
        )
    }

     if (event.data.type === "SET_LATLNG_LAWYER") {
         const { lat, lng, name, city, rating, image } = event.data
       
        console.log("Lawyer data received in mapmicroservice:", { lat, lng, name, city, rating, image });
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
             image,
             "red"
         )
     }

   
});
