// Initialize the map
let map = L.map("map").setView([30.7333, 76.7794], 13)

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map)

// Store markers
let markers = []
let markerCounter = 1

// Custom marker icons for different colors
const markerIcons = {
    blue: L.divIcon({
        html: '<div style="background-color: #3388ff; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 1px #3388ff;"></div>',
        className: "custom-marker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    }),
    red: L.divIcon({
        html: '<div style="background-color: #ff4444; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 1px #ff4444;"></div>',
        className: "custom-marker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    }),
    green: L.divIcon({
        html: '<div style="background-color: #44ff44; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 1px #44ff44;"></div>',
        className: "custom-marker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    }),
    orange: L.divIcon({
        html: '<div style="background-color: #ff8844; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 1px #ff8844;"></div>',
        className: "custom-marker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    }),
    purple: L.divIcon({
        html: '<div style="background-color: #8844ff; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 1px #8844ff;"></div>',
        className: "custom-marker",
        iconSize: [18, 18],
        iconAnchor: [9, 9],
    }),
}

// Add initial marker (matching your original coordinates)
addMarkerToMap(
    30.7333,
    76.7794,
    "Original Location",
    "Your original marker location",
    "blue"
)

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

    updateMarkersList()
}

function removeMarker(id) {
    const index = markers.findIndex((m) => m.id === id)
    if (index > -1) {
        map.removeLayer(markers[index].marker)
        markers.splice(index, 1)
        updateMarkersList()
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
    updateMarkersList()
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
    addMarkerToMap(
        30.74,
        76.78,
        "Sample Location 1",
        "This is a sample red marker",
        "red"
    )
    addMarkerToMap(
        30.73,
        76.785,
        "Sample Location 2",
        "This is a sample green marker",
        "green"
    )
    addMarkerToMap(
        30.738,
        76.775,
        "Sample Location 3",
        "This is a sample orange marker",
        "orange"
    )
}, 1000)
