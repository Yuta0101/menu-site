/*
*URLdeki arama parametrelerini yönetebilmek için yerleşik bir JS class'ı 
bulunmaktadır
-URLSearchParams
*/
const params = new URLSearchParams(location.search);
//JS class'ının sağladığı get metodu ile parametreye erişme
const paramId = params.get("id");
document.addEventListener("DOMContentLoaded", async () => {
  //APIden ürünleri alma
  const res = await fetch("../db.json");
  const data = await res.json();
  //URLdeki Idye denk gelen ürünü bulma
  const product = data.menu.find((i) => i.id === Number(paramId));
  renderPage(product)
});
//Arayüzü göndereceğimiz div
const outlet = document.querySelector("#outlet")

//Bütün arayüzü ekrana basar
function renderPage(product){
    let priceHtml = "";
    if (product.priceSmall && product.priceLarge) {
      priceHtml = `小：<span class="text-success">NT$${product.priceSmall}</span> / 大：<span class="text-success">NT$${product.priceLarge}</span>`;
    } else {
      priceHtml = `<span class="text-success">NT$${product.price}</span>`;
    }
   outlet.innerHTML = `
   <div class="d-flex justify-content-between fs-5 align-items-center flex-wrap">
       <div class="home-link">
         <a href="index.html">
          <img src="images/home.gif" alt="回首頁">
         </a>
       </div>
        <div style="word-break: break-all;">主頁/${product.category}/${product.title.toLowerCase()}</div>
    </div>
    <h1 class="text-center my-3 shadow rounded p-2">${product.title}</h1>
    <img src="${product.img}" class="rounded object-fit-cover shadow-lg" style="max-height: 400px">

    <h3 class="my-2">價格：${priceHtml}</h3>

    <p class="lead fs-3">
   ${product.desc}
    </p>
   `
}