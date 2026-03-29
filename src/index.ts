import "@/index.css";
import GitHubPage from "@/pages/GitHubPage/GitHubPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const gitHubPage = GitHubPage();
  app.appendChild(gitHubPage);
};

document.addEventListener("DOMContentLoaded", onInit);
