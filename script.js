// Initialize the map
let map = L.map("map").setView([30.7333, 76.7794], 13)

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

    marker.bindPopup(`<b>${title}</b><br>${description}<br><small>Coordinates: ${lat}, ${lng}</small>  <a href="#" onclick="openDirections(${lat}, ${lng})" style="color:#007bff; text-decoration:underline; cursor:pointer;">
            🚗 Directions
        </a>`)

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
});
