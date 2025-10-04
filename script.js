// Kiểm tra trạng thái đăng nhập
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// Đổi nút login thành logout nếu đã đăng nhập
const loginBtn = document.getElementById("loginBtn");
if (isLoggedIn) {
  loginBtn.textContent = "🚪 Đăng xuất";
  loginBtn.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  });
}

// Hiện/ẩn thực đơn mẫu
document.getElementById("showMenuBtn").addEventListener("click", function() {
  const sampleMenus = document.getElementById("sampleMenus");
  if (sampleMenus.style.display === "none") {
    sampleMenus.style.display = "flex";
    this.textContent = "🔽 Ẩn thực đơn mẫu";
  } else {
    sampleMenus.style.display = "none";
    document.getElementById("menuDetail").style.display = "none";
    this.textContent = "📖 Xem thực đơn mẫu";
  }
});

// Chi tiết thực đơn mẫu
const menuDetails = {
  TietKiem: {
    title: "🍚 Cơm chiên trứng + Rau luộc",
    price: "15.000 VNĐ",
    ingredients: [
      "Gạo: 5.000 VNĐ",
      "Trứng: 5.000 VNĐ",
      "Rau xanh: 5.000 VNĐ"
    ],
    steps: [
      "Vo gạo và nấu cơm.",
      "Chiên cơm với trứng và gia vị.",
      "Luộc rau, chấm nước mắm."
    ]
  },
  Protein: {
    title: "🥩 Ức gà nướng + Trứng luộc",
    price: "50.000 VNĐ",
    ingredients: [
      "Ức gà: 40.000 VNĐ",
      "Trứng gà: 10.000 VNĐ"
    ],
    steps: [
      "Ướp ức gà với gia vị, nướng vàng.",
      "Luộc trứng chín vừa."
    ]
  },
  Chay: {
    title: "🥗 Đậu phụ sốt cà + Rau củ xào",
    price: "30.000 VNĐ",
    ingredients: [
      "Đậu phụ: 10.000 VNĐ",
      "Cà chua: 5.000 VNĐ",
      "Rau củ hỗn hợp: 15.000 VNĐ"
    ],
    steps: [
      "Rán đậu, sốt cà chua.",
      "Xào rau củ với dầu thực vật."
    ]
  }
};

// Bắt sự kiện click vào menu mẫu
document.querySelectorAll(".menu-card").forEach(card => {
  card.addEventListener("click", function() {
    const id = this.getAttribute("data-id");
    const menu = menuDetails[id];
    const menuDetail = document.getElementById("menuDetail");

    menuDetail.innerHTML = `
      <h3 class="text-primary">${menu.title}</h3>
      <p class="fw-bold">💰 Giá: ${menu.price}</p>
      <h5>🛒 Nguyên liệu:</h5>
      <ul>${menu.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h5>👨‍🍳 Cách nấu:</h5>
      <ol>${menu.steps.map(s => `<li>${s}</li>`).join("")}</ol>
    `;
    menuDetail.style.display = "block";
    menuDetail.scrollIntoView({ behavior: "smooth" });
  });
});

// Form gợi ý theo ngân sách
const form = document.getElementById("menuForm");
const suggestion = document.getElementById("suggestion");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  const budgetInput = document.getElementById("budget");
  const peopleInput = document.getElementById("people");
  const budget = parseInt(budgetInput.value);
  const people = parseInt(peopleInput.value);
  const diet = document.getElementById("diet").value;

  let valid = true;

  if (isNaN(budget) || budget < 10000) {
    budgetInput.classList.add("is-invalid");
    valid = false;
  } else {
    budgetInput.classList.remove("is-invalid");
  }

  if (isNaN(people) || people <= 0) {
    peopleInput.classList.add("is-invalid");
    valid = false;
  } else {
    peopleInput.classList.remove("is-invalid");
  }

  if (!valid) {
    suggestion.innerHTML = "<h3 class='text-danger'>⚠️ Vui lòng nhập thông tin hợp lệ!</h3>";
    return;
  }

  let resultHTML = "<h3 class='text-primary'>🍽️ Gợi ý thực đơn</h3><ul class='list-group mt-3'>";
  let items = [];
  switch (diet) {
    case "TietKiem":
      items.push("🍚 Cơm + Trứng + Rau (15.000 VNĐ/người)");
      break;
    case "Protein":
      items.push("🥩 Ức gà nướng + Trứng luộc (50.000 VNĐ/người)");
      break;
    case "Chay":
      items.push("🥗 Đậu phụ sốt cà + Rau củ (30.000 VNĐ/người)");
      break;
    case "ItDauMo":
      items.push("🍲 Canh rau cải + Cá hấp (40.000 VNĐ/người)");
      break;
  }

  items.forEach(i => {
    resultHTML += `<li class='list-group-item'>${i}</li>`;
  });

  resultHTML += "</ul><div class='mt-3'>" +
    "<button class='btn btn-success me-2' onclick='saveMenuLocal()'>💾 Lưu thực đơn</button>" +
    "<button class='btn btn-secondary me-2'>⬇️ Tải xuống PDF</button>" +
    "<button class='btn btn-secondary'>⬇️ Tải xuống Excel</button>" +
    "</div>";

  suggestion.innerHTML = resultHTML;

  // Lưu thực đơn cuối cùng vào biến toàn cục
  window.lastSuggested = {
    diet: diet,
    budget: budget,
    people: people,
    items: items
  };
});

// ========================
// Hàm lưu thực đơn vào localStorage
// ========================
function saveMenuLocal() {
  if (!window.lastSuggested) {
    alert("❌ Chưa có thực đơn nào để lưu!");
    return;
  }

  const saved = JSON.parse(localStorage.getItem('savedMenus') || '[]');
  const entry = {
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
    ...window.lastSuggested
  };

  saved.unshift(entry);
  localStorage.setItem('savedMenus', JSON.stringify(saved));

  alert("✅ Thực đơn đã được lưu trong trình duyệt!");
}
