const numIndicators = document.querySelector(".num-indicators");
const numIndicatorsButton = document.querySelectorAll(".num-indicators button");

function firstImage() {
  const pictureImage = document.querySelector(
    " .grid-container--technology > picture img"
  );
  const mediaQuery = window.matchMedia("(min-width: 55em)");
  if (mediaQuery.matches) {
    pictureImage.style.content = `url("./assets/technology/image-launch-vehicle-portrait.jpg")`;
  }
}
firstImage();

async function technologyData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data.technology;
}

numIndicators.addEventListener("click", async function (e) {
  if (e.target.className !== "technology-btn") return;

  // changing btn background color
  numIndicatorsButton.forEach((btn) => {
    btn.setAttribute("aria-selected", false);
  });
  e.target.setAttribute("aria-selected", true);

  //Html function
  techHtml(e.target);
});

function hidden(element) {
  element.forEach((item) => {
    item.remove();
  });
}

async function techHtml(target) {
  const techData = await technologyData();

  //Addig html into dom
  const html = `<div class="technology-details flow" data-id="${
    target.dataset.id
  }">
        <div>
          <p class="fs-400 ff-serif text-accent uppercase">
            The terminology...
          </p>
          <h1 class="fs-700 uppercase ff-serif">${
            techData[+target.dataset.id].name
          }</h1>
        </div>
        <p class="text-accent tech-pera">
         ${techData[+target.dataset.id].description}
        </p>
      </div>
      <picture class="tech-picture" data-id=${target.dataset.id}>
        <img
          src="${techData[+target.dataset.id].images.landscape}"
          alt=${techData[+target.dataset.id].name}
        />
      </picture>`;
  const techDetails = document.querySelectorAll(".technology-details");
  const techPicture = document.querySelectorAll(".tech-picture");

  // hidding picture and details
  hidden(techDetails);

  hidden(techPicture);

  numIndicators.insertAdjacentHTML("afterend", html);
  //   console.log(html);
  document
    .querySelector(`[data-id="${target.dataset.id}"]`)
    .removeAttribute("hidden");

  addNewImage(target, techData);
}

const mediaQuery = window.matchMedia("(min-width: 55rem)");

function addNewImage(target, techData) {
  const image = document.querySelector(`[data-id="${target.dataset.id}"] img`);

  if (mediaQuery.matches) {
    image.src = `${techData[+target.dataset.id].images.portrait}`;
    console.log("hi");
    // document.body.style.color = "red";
  } else {
    image.src = `${techData[+target.dataset.id].images.landscape}`;
    console.log("hello");
    // document.body.style.color = "blue";
  }
}

mediaQuery.addEventListener("change", addNewImage);
