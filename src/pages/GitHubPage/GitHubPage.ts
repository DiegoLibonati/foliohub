import { CardInit } from "@src/components/CardInit/CardInit";
import { CardProfile } from "@src/components/CardProfile/CardProfile";

import { getGithubProfile } from "@src/api/get/getGithubProfile";

import { gitHubStore } from "@src/stores/gitHubStore";

import { setAlert } from "@src/helpers/setAlert";

const handleSearchUser = async (e: SubmitEvent, input: HTMLInputElement) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) return setAlert(`You must enter valid content.`);

  try {
    const githubProfile = await getGithubProfile(value);

    await gitHubStore.setProfile(githubProfile);

    setAlert("The profile exist ✅");
  } catch {
    await gitHubStore.setProfile(null);
    setAlert(`The profile dosen´t exist 😔`);
  }
};

export const GitHubPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className =
    "flex flex-col items-center justify-center w-full min-h-screen main_container my-2 md:my-0";

  main.innerHTML = `
    <form class="mb-2 p-2 rounded-lg bg-secondary form-search">
        <input
            class="bg-secondary text-white outline-none"
            placeholder="Username"
            type="text"
        />
        <button
            type="submit"
            class="bg-transparent text-white cursor-pointer"
            aria-label="search profile"
        >
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </form>

    <section class="flex flex-col items-center justify-center w-full h-auto card">
    </section>
  `;

  const formSearch = main.querySelector<HTMLFormElement>(".form-search");
  const input =
    formSearch!.querySelector<HTMLInputElement>(".form-search input");

  formSearch?.addEventListener("submit", (e) => handleSearchUser(e, input!));

  const renderCardInit = () => {
    const card = main.querySelector<HTMLElement>(".card");
    card?.replaceChildren();

    const cardInit = CardInit();

    card?.append(cardInit);
  };

  const renderCardProfile = () => {
    const { profile, repos } = gitHubStore.getState();

    const card = main.querySelector<HTMLElement>(".card");
    card?.replaceChildren();

    const cardProfile = CardProfile({
      avatar_url: profile?.avatar_url!,
      bio: profile?.bio!,
      followers: profile?.followers!,
      following: profile?.following!,
      name: profile?.name!,
      public_repos: profile?.public_repos!,
      repos: repos,
    });

    card?.append(cardProfile);
  };

  renderCardInit();

  gitHubStore.subscribe("profile", (profile) => {
    if (!profile) return renderCardInit();
    return renderCardProfile();
  });

  return main;
};
