import { buttonData } from "./constant.js";

const buttonArea = document.getElementById("buttons");

// 定義分類顯示順序與標題
const categoryOrder = [
  { value: "套餐", label: "套餐（飲料可更換）" },
  { value: "飯麵", label: "飯麵" },
  { value: "蛋餅 蔥抓餅", label: "蛋餅 蔥抓餅" },
  { value: "手工饅頭", label: "手工饅頭" },
  { value: "其他", label: "其他" },
  { value: "飲料", label: "飲料" }
];

// 細長條型卡片樣式
function renderLongCard(item) {
  let priceHtml = "";
  // 飯麵類（有 priceSmall/priceLarge）
  if (item.priceSmall && item.priceLarge) {
    priceHtml = `<span class="text-success fw-bold">${item.priceSmall}元 / 大：${item.priceLarge}元</span>`;
  // 飲料類（有 price 和 priceLarge）
  } else if (item.price !== undefined && item.priceLarge) {
    priceHtml = `<span class="text-success fw-bold">${item.price}元 / 大：${item.priceLarge}元</span>`;
  } else if (item.pricePlusEgg) {
    priceHtml = `<span class="text-success fw-bold">${item.price}元</span> <span class="text-danger ms-2">加蛋${item.pricePlusEgg}元</span>`;
  } else {
    priceHtml = `<span class="text-success fw-bold">${item.price}元</span>`;
  }
  return `
    <a href="detail.html?id=${item.id}" class="menu-long-card-link" style="text-decoration:none;color:inherit;">
      <div class="menu-long-card d-flex align-items-center gap-3 mb-2 p-2 shadow-sm rounded bg-white flex-wrap">
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="flex-grow-1">
          <div class="fw-bold">${item.title}</div>
          <div class="text-muted small">${item.desc ? item.desc.slice(0, 40) : ""}</div>
        </div>
        <div style="min-width:100px;">${priceHtml}</div>
      </div>
    </a>
  `;
}

// 依分類分區塊顯示
export function renderMenuItems(menuItems, menuList) {
  let html = "";
  categoryOrder.forEach(cat => {
    const items = menuItems.filter(i => i.category === cat.value);
    if (items.length > 0) {
      html += `<h3 class="mt-4 mb-2">${cat.label}</h3>`;
      html += items.map(renderLongCard).join("");
    }
  });
  menuList.innerHTML = html;
}

//Ekrana butonları basar
export function renderButtons(activeText) {
    buttonArea.innerHTML = ''
    buttonData.forEach((btn) => {
      const buttonEle = document.createElement("button");
      buttonEle.className = "btn btn-outline-dark";
      buttonEle.dataset.category = btn.value;
      if(btn.text === activeText){
          buttonEle.classList.add('btn-dark', 'text-white');
      }
      buttonEle.innerText = btn.text;
      buttonArea.appendChild(buttonEle);
    });
}

