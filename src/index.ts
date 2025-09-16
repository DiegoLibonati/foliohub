import { Profile, Repo } from "@src/entities/vite-env";

import { getGithubProfile } from "@src/api/getGithubProfile";
import { getGithubProfileRepos } from "@src/api/getGithubProfileRepos";

import { getElements } from "@src/helpers/getElements";

let timeoutAlert: NodeJS.Timeout | null;

const setInitialState = () => {
  timeoutAlert = null;
};

const clearProfile = (): void => {
  const {
    imgProfile,
    nameProfile,
    descriptionProfile,
    followersProfile,
    followingProfile,
    reposProfile,
    reposContainer,
    listReposContainer,
  } = getElements();

  imgProfile.src = "";
  imgProfile.alt = "";

  nameProfile.textContent = "";
  descriptionProfile.textContent = "";

  followersProfile.removeChild(followersProfile.firstChild!);
  followingProfile.removeChild(followingProfile.firstChild!);
  reposProfile.removeChild(reposProfile.firstChild!);

  reposContainer.style.display = "none";
  listReposContainer.innerHTML = "";
};

const createLinkRepo = (href: string, name: string): HTMLLIElement => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  li.setAttribute(
    "class",
    "text-white bg-primary rounded-lg cursor-pointer py-[.2rem] px-[.3rem] mr-[.3rem] mt-[.3rem]"
  );

  li.append(a);

  a.setAttribute("href", href);
  a.setAttribute("target", "_blank");
  a.setAttribute("aria-label", `go to ${name}`);
  a.textContent = name;

  return li;
};

const setAlert = (message: string): void => {
  const { alertH2, alertContainer } = getElements();

  alertH2.innerHTML = message;
  alertContainer.style.opacity = "100";

  timeoutAlert = setTimeout(() => {
    alertContainer.style.opacity = "0";
  }, 2000);
};

const handleSearchProfile = async (): Promise<void> => {
  const {
    inputSearchProfile,
    containerCardInit,
    containerCardProfile,
    imgProfile,
    nameProfile,
    descriptionProfile,
    followersProfile,
    followingProfile,
    reposProfile,
    reposContainer,
    listReposContainer,
  } = getElements();

  if (timeoutAlert) clearTimeout(timeoutAlert);

  clearProfile();

  const inputSearchProfileValue: string = inputSearchProfile.value.trim();

  if (!inputSearchProfileValue)
    return setAlert(`You must enter valid content.`);

  const githubProfile = await getGithubProfile(inputSearchProfileValue);

  inputSearchProfile.value = "";

  if (!githubProfile) {
    containerCardInit.style.display = "flex";
    containerCardProfile.style.display = "none";

    return setAlert(`The profile dosen´t exist 😔`);
  }

  const profile = githubProfile as Profile;

  containerCardInit.style.display = "none";
  containerCardProfile.style.display = "flex";

  imgProfile.src = profile.avatar_url;
  imgProfile.alt = profile.name;
  nameProfile.textContent = profile.name || "N/A";
  descriptionProfile.textContent = profile.bio || "N/A";
  followersProfile.prepend(String(profile.followers) || "0");
  followingProfile.prepend(String(profile.following) || "0");
  reposProfile.prepend(String(profile.public_repos) || "0");

  const githubProfileReposUrl = await getGithubProfileRepos(profile.login);

  if (githubProfileReposUrl) {
    const repos = githubProfileReposUrl as Repo[];

    reposContainer.style.display = "flex";

    repos.slice(0, 8).forEach((repo) => {
      const li = createLinkRepo(repo.html_url, repo.name);

      listReposContainer.append(li);
    });
  }

  return setAlert("The profile exist ✅");
};

const onInit = (): void => {
  setInitialState();

  const { buttonSearchProfile } = getElements();

  buttonSearchProfile.addEventListener("click", handleSearchProfile);
};

// Events
document.addEventListener("DOMContentLoaded", onInit);
