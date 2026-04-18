import "@/index.css";
import FoliohubPage from "@/pages/FoliohubPage/FoliohubPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const foliohubPage = FoliohubPage();
  app.appendChild(foliohubPage);
};

document.addEventListener("DOMContentLoaded", onInit);
