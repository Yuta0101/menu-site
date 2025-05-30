import { buttonData } from "./constant.js";

const buttonArea = document.getElementById("buttons");
//Ekrana menü elemanlarını basar
export function renderMenuItems(menuItems, menuList) {
  //Dizideki her bir eleman için bir menü HTMLi
  // oluşturup ekrana basar
  menuList.innerHTML = menuItems
  .map(
      (item) =>
        `
        <a id="item-${item.id}" href="/detail.html?id=${item.id}" class="d-flex flex-column flex-md-row text-decoration-none text-dark gap-3">
       <img class="rounded shadow img-fluid" src="${item.img}" style="width: 190px; height: 150px; object-fit: cover;" />
          <div class="flex-grow-1">
            <div class="d-flex align-items-start">
              <div class="flex-grow-1">
                <h5>${item.title}</h5>
              </div>
              <div style="min-width: 80px; font-size: 25px;" class="text-success fw-bold text-end">
              ${item.price}&nbsp;NT</div>
            </div>
            <p class="lead">
              ${item.desc.slice(0, 80) + "..."}
            </p>
          </div>
        </a>
        `
    )
    .join(" ");
}
//Ekrana butonları basar
export function renderButtons(activeText) {
    //Eski eklenen butonları temizle
    buttonArea.innerHTML = ''
  //yeni butonları oluşturma
  buttonData.forEach((btn) => {
    //Button elementi oluşturma
    const buttonEle = document.createElement("button");
    //class belirleme
    buttonEle.className = "btn btn-outline-dark";

    //data-id belirleme
    buttonEle.dataset.category = btn.value;

    //Eğer eleman aktifse bu class ı ver
    if(btn.text === activeText){
        buttonEle.classList.add('btn-dark', 'text-white');
    }
    //İçindeki yazıyı belirleme
    buttonEle.innerText = btn.text;
    //butonu html'e gönderme
    buttonArea.appendChild(buttonEle);
  });
}

