import { GitHubPage } from "@src/pages/GitHubPage/GitHubPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const gitHubPage = GitHubPage();
  app.appendChild(gitHubPage);
};

document.addEventListener("DOMContentLoaded", onInit);
