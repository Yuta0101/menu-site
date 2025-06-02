import { renderMenuItems, renderButtons } from "./scripts/ui.js";

// 取得 HTML 中的菜單列表與分類按鈕區塊
const menuList = document.querySelector("#menu-list");
const buttonsArea = document.getElementById("buttons");
const loading = document.getElementById("loading"); // 取得 loading 區塊

// 頁面載入完成時，初始化分類按鈕並載入菜單資料
document.addEventListener("DOMContentLoaded", () => {
  renderButtons(); // 顯示分類按鈕
  showLoading();   // 顯示 loading
  fetchMenu();     // 載入菜單資料
});

// 全域變數，儲存菜單資料
let data;

// 顯示 loading
function showLoading() {
  if (loading) loading.style.display = "flex";
}
// 隱藏 loading
function hideLoading() {
  if (loading) loading.style.display = "none";
}

// 從 db.json 取得菜單資料
async function fetchMenu() {
  showLoading();
  const res = await fetch("./db.json"); // 取得資料
  data = await res.json(); // 解析 JSON
  renderMenuItems(data.menu, menuList); // 顯示所有餐點
  hideLoading();
}

// 監聽分類按鈕點擊事件
buttonsArea.addEventListener("click", (e) => {
  // 避免點到按鈕區塊本身
  if (e.target.id !== "buttons") {
    renderButtons(e.target.innerText); // 更新按鈕樣式
    // 取得被點擊的分類
    const selected = e.target.dataset.category;
    showLoading();
    setTimeout(() => { // 模擬資料載入
      if (selected === "all") {
        // 顯示全部餐點
        renderMenuItems(data.menu, menuList);
      } else {
        // 依分類過濾餐點
        const filtered = data.menu.filter((i) => i.category === selected);
        // 顯示過濾後的餐點
        renderMenuItems(filtered, menuList);
      }
      hideLoading();
    }, 300); // 可依實際情況調整延遲
  }
});
