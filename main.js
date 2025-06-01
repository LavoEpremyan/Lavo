// Տեսարժան վայրեր
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

// Ֆիլտրեր
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

// Քարտեզ
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

// Ամենամոտ վայրը
document.getElementById("findNearest").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Ձեր բրաուզերը չի աջակցում տեղաբաշխմանը։");
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    let nearest = null;
    let minDistance = Infinity;

    attractions.forEach((a) => {
      const dist = Math.sqrt(
        Math.pow(userLat - a.coords[0], 2) + Math.pow(userLng - a.coords[1], 2)
      );
      if (dist < minDistance) {
        minDistance = dist;
        nearest = a;
      }
    });

    if (nearest) {
      document.getElementById("routeResult").innerText = `Ամենամոտ վայրն է՝ ${nearest.name}`;
      map.setView(nearest.coords, 14);
    }
  });
});

// Մութ ռեժիմ
document.getElementById("toggleDark").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Նկարների վերբեռնում
document.getElementById("imageUpload").addEventListener("change", function () {
  const gallery = document.getElementById("gallery");
  Array.from(this.files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

// Մեկնաբանություններ
const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("username").value;
  const comment = document.getElementById("usercomment").value;
  const entry = { name, comment, date: new Date().toLocaleString(), replies: [] };
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.push(entry);
  localStorage.setItem("comments", JSON.stringify(comments));
  form.reset();
  renderComments();
});

function renderComments() {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  list.innerHTML = comments.map((c, i) => `
    <div>
      <strong>${c.name}</strong> <em>${c.date}</em><br>${c.comment}
      <div class="reply-btn" onclick="replyTo(${i})">Պատասխանել</div>
      ${c.replies.map(r => `<div style="margin-left:1rem;"><em>${r}</em></div>`).join("")}
    </div>
  `).join("");
}

window.replyTo = function(index) {
  const reply = prompt("Գրեք ձեր պատասխանը");
  if (reply) {
    const comments = JSON.parse(localStorage.getItem("comments") || "[]");
    comments[index].replies.push(reply);
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }
};

renderComments();

// Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'hy',
    includedLanguages: 'en,ru,fr,de,hy',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Քվեարկություն
const pollForm = document.getElementById("pollForm");
const pollChart = document.getElementById("pollChart").getContext("2d");
let pollData = JSON.parse(localStorage.getItem("poll") || "{}");

pollForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = pollForm.poll.value;
  if (selected) {
    pollData[selected] = (pollData[selected] || 0) + 1;
    localStorage.setItem("poll", JSON.stringify(pollData));
    renderPollChart();
  }
});

function renderPollChart() {
  const data = {
    labels: Object.keys(pollData),
    datasets: [{
      label: "Ձայներ",
      data: Object.values(pollData),
      backgroundColor: ["#66bb6a", "#29b6f6", "#ffa726"]
    }]
  };
  new Chart(pollChart, {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
renderPollChart();

// AI Խորհուրդ
document.getElementById("getSuggestion").addEventListener("click", () => {
  const random = attractions[Math.floor(Math.random() * attractions.length)];
  document.getElementById("suggestionResult").innerText = `Խորհուրդ ենք տալիս այցելել՝ ${random.name}`;
});
