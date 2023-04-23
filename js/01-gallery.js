import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryListUrl = document.querySelector(".gallery");
// *

// ? // Створюю масив з li>a>img> методом map та додаю розмітку в html

const newGalleryItems = galleryItems
  .map(
    (image) =>
      `<li class=gallery__item><a class=gallery__link href=${image.original}><img class=gallery__image src=${image.preview} data-source=${image.original} alt='${image.description}'</img></a></li>`
  )
  .join("");

galleryListUrl.insertAdjacentHTML("afterbegin", newGalleryItems);

// ? // Додаю слухач події "click" де спрацює onImageClick

galleryListUrl.addEventListener("click", onImageClick);

function onImageClick(event) {
  event.preventDefault();

  // ? // Функція спрацьовує тільки на елементах з nodeName === IMG

  if (event.target.nodeName !== "IMG") {
    return;
  }

  // ? // Створюється модалка за допомогою basicLightbox

  const modal = basicLightbox.create(
    `
  <img src=${event.target.dataset.source} width="800" height="600">
  `,
    { onClose: (modal) => window.removeEventListener("keydown", onEscKeyPress) }
  );
  modal.show();

  // ? // Додаю слухач події "keydown" де спрацює onEscKeyPress

  window.addEventListener("keydown", onEscKeyPress);

  // ? // Оголошую функцію що спрацює тільки при натисканні "Escape"

  function onEscKeyPress(event) {
    if (event.key === "Escape") {
      modal.close();
    }
  }

  // ? // Модалка закривається, і знімається слухач події "keydown"
}

// todo // Додатковий спосіб вирішення через метод масиву .find

// function onImageClick(event) {
//   event.preventDefault();
//   if (event.target.nodeName !== "IMG") {
//     return;
//      }

//   const foundGalleryItem = galleryItems.find(item => event.target.src === item.preview);

//   const modal = basicLightbox.create(`
//   <img src=${foundGalleryItem.original} width="800" height="600">
//   `);

//   modal.show();

//   window.addEventListener("keydown", onEscKeyPress);

//   function onEscKeyPress(event) {
//     if (event.key === "Escape") {
//       modal.close();
//       window.removeEventListener("keydown", onEscKeyPress);
//     }
//   }
// }

// *
