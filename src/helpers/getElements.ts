export const getElements = () => ({
  alertH2: document.querySelector(".alert_h2") as HTMLHeadingElement,
  alertContainer: document.querySelector(".alert") as HTMLHeadingElement,
  containerCardInit: document.querySelector(
    ".section_container_card_init"
  ) as HTMLElement,
  containerCardProfile: document.querySelector(
    ".section_container_card"
  ) as HTMLElement,
  imgProfile: document.getElementById("img-profile") as HTMLImageElement,
  nameProfile: document.getElementById("name-profile") as HTMLHeadingElement,
  descriptionProfile: document.getElementById(
    "description-profile"
  ) as HTMLParagraphElement,
  followersProfile: document.getElementById(
    "followers-profile"
  ) as HTMLHeadingElement,
  followingProfile: document.getElementById(
    "following-profile"
  ) as HTMLHeadingElement,
  reposProfile: document.getElementById("repos-profile") as HTMLHeadingElement,
  inputSearchProfile: document.querySelector(
    ".section_container_search input"
  ) as HTMLInputElement,
  buttonSearchProfile: document.querySelector(
    ".section_container_search button"
  ) as HTMLButtonElement,
  reposContainer: document.querySelector(".card-repos") as HTMLDivElement,
  listReposContainer: document.querySelector(
    ".card-repos-list"
  ) as HTMLUListElement,
});
