const attractions = [
  {
    name: "Բաղաբերդի ամրոց",
    image: "images/baghaberd_amroc.jpg",
    description: "Բաղաբերդը 4-րդ դարի ամրոց է Կապան և Քաջարան քաղաքների միջև։",
    coords: [39.1953, 46.4119],
    category: "Պատմական",
    wiki: "https://hy.wikipedia.org/wiki/Բաղաբերդ"
  },
  {
    name: "Խուստուփ լեռ",
    image: "images/khustup-ler.jpg",
    description: "Խուստուփ լեռն՝ 3201 մ բարձրությամբ։",
    coords: [39.1067, 46.3956],
    category: "Բնապահպանական",
    wiki: "https://hy.wikipedia.org/wiki/Խուստուփ"
  },
  {
    name: "Վահանավանք",
    image: "images/vahanavanq.jpg",
    description: "Վահանավանքը՝ 10-11-րդ դարերի վանական համալիր։",
    coords: [39.1903, 46.4040],
    category: "Պատմական",
    wiki: "https://hy.wikipedia.org/wiki/Վահանավանք"
  },
  {
    name: "Զիփլայն Կապանում",
    image: "images/zipline.png",
    description: "Զիփլայն թռիչք քաղաքի վրայով՝ էքստրեմալ փորձառություն։",
    coords: [39.208, 46.405],
    category: "Արշավային",
    wiki: "https://kapantourism.am"
  }
];

const container = document.getElementById("attractions-container");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("categoryFilter");

function displayAttractions(data) {
  container.innerHTML = "";
  data.forEach(({ name, image, description, wiki }) => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
      <a href="${wiki}" target="_blank" class="wiki-link">Իմացիր ավելին</a>
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
    (a) => a.name.toLowerCase().includes(term) && (category === "Բոլորը" || a.category === category)
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

attractions.forEach(({ name, description, coords, wiki }) => {
  if (coords) {
   
