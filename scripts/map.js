// Initialize the map
const map = L.map("map").setView([51.9993, 8.5578], 15);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create custom marker icon
const customIcon = L.divIcon({
  html: `
        <div style="
            width: 30px;
            height: 30px;
            background: #dc3545;
            border-radius: 50% 50% 50% %50;
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            position: relative;
            transform: rotate(45deg);
        ">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
            "></div>
        </div>
    `,
  className: "custom-marker",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// Add marker for German Trade House
const marker = L.marker([51.9993, 8.5578], { icon: customIcon })
  .addTo(map)
  .bindPopup(
      `
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px 0; color: #2c2c2c;">Siechenmarschstr. 13</h3>
            <p style="margin: 0 0 5px 0; color: #666;">Siechenmarschstr. 13</p>
            <p style="margin: 0 0 10px 0; color: #666;">33615 Bielefeld, Germany</p>
            <button onclick="getDirections()" style="
                background: #B8860B;
                color: white;
                border: none;
                padding: 16px 28px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1.12em;
                font-weight: bold;
                margin-top: 10px;
                letter-spacing: 1.1px;
                box-shadow: 0 3px 10px #b8860b32;
            ">Get Directions</button>
        </div>
    `,
    { maxWidth: 200, minWidth: 150 }
)
  
  .openPopup();

// Add some map interaction effects
map.on("click", function (e) {
  // Create a temporary circle at click location
  const circle = L.circle(e.latlng, {
    color: "#B8860B",
    fillColor: "#B8860B",
    fillOpacity: 0.3,
    radius: 50,
  }).addTo(map);

  setTimeout(() => {
    map.removeLayer(circle);
  }, 1000);
});


// Directions function
function getDirections() {
  const address = "Siechenmarschstr. 13, 33615 Bielefeld, Germany";
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  window.open(url, "_blank");
}

// Add floating animation to social links
document.querySelectorAll(".social-link").forEach((link, index) => {
  link.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
});

window.addEventListener("load", function () {
  setTimeout(function () {
    map.invalidateSize();
  }, 200);
});
