const attractions = [
  {
    name: "Բաղաբերդի ամրոց",
    image: "images/baghaberd_amroc.jpg",
    description: "Բաղաբերդը 4-րդ դարի ամրոց է Կապան և Քաջարան քաղաքների միջև։",
    coords: [39.1953, 46.4119],
    category: "Պատմական"
  },
  {
    name: "Խուստուփ լեռ",
    image: "images/khustup-ler.jpg",
    description: "Խուստուփ լեռն՝ 3201 մ բարձրությամբ։",
    coords: [39.1067, 46.3956],
    category: "Բնապահպանական"
  },
  {
    name: "Վահանավանք",
    image: "images/vahanavanq.jpg",
    description: "Վահանավանքը՝ 10-11-րդ դարերի վանական համալիր։",
    coords: [39.1903, 46.4040],
    category: "Պատմական"
  },
  {
    name: "Զիփլայն Կապանում",
    image: "images/zipline.png",
    description: "Զիփլայն թռիչք քաղաքի վրայով՝ էքստրեմալ փորձառություն։",
    coords: [39.208, 46.405],
    category: "Արշավային"
  }
];

const container = document.getElementById("attractions-container");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("categoryFilter");

function displayAttractions(data) {
  container.innerHTML = "";
  data.forEach(({ name, image, description }) => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
      <div class="rating">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
    `;
    const stars = card.querySelectorAll(".rating span");
    stars.forEach((star, i) => {
      star.addEventListener("click", () => {
        stars.forEach((s, index) => s.classList.toggle("selected", index <= i));
      });
    });
    container.appendChild(card);
  });
}

function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const category = filterSelect.value;
  const filtered = attractions.filter(
    (a) =>
      a.name.toLowerCase().includes(term) &&
      (category === "Բոլորը" || a.category === category)
  );
  displayAttractions(filtered);
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);
displayAttractions(attractions);

// Leaflet Map
const map = L.map("map").setView([39.205, 46.405], 12);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

attractions.forEach(({ name, description, coords }) => {
  if (coords) {
    L.marker(coords)
      .addTo(map)
      .bindPopup(`<strong>${name}</strong><br>${description}`);
  }
});

// Dark mode toggle
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Comments & Replies
const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("username").value;
  const comment = document.getElementById("usercomment").value;
  const entry = { name, comment
::contentReference[oaicite:0]{index=0}
 
