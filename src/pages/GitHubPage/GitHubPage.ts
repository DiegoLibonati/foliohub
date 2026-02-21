import type { Page } from "@/types/pages";

import { CardInit } from "@/components/CardInit/CardInit";
import { CardProfile } from "@/components/CardProfile/CardProfile";

import { githubService } from "@/services/githubService";

import { gitHubStore } from "@/stores/gitHubStore";

import { setAlert, clearAlert } from "@/helpers/setAlert";

const handleSearchUser = async (
  e: SubmitEvent,
  input: HTMLInputElement
): Promise<void> => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) {
    setAlert("You must enter valid content.");
    return;
  }

  try {
    const githubProfile = await githubService.getProfile(value);

    await gitHubStore.setProfile(githubProfile);

    setAlert("The profile exists ✅");
  } catch {
    await gitHubStore.setProfile(null);
    setAlert("The profile doesn't exist 😔");
  }
};

export const GitHubPage = (): Page => {
  const main = document.createElement("main") as Page;
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
  const input = formSearch?.querySelector<HTMLInputElement>("input");

  const handleFormSubmit = (e: SubmitEvent): void => {
    if (input) {
      void handleSearchUser(e, input);
    }
  };

  formSearch?.addEventListener("submit", handleFormSubmit);

  const renderCardInit = (): void => {
    const card = main.querySelector<HTMLElement>(".card");
    card?.replaceChildren();

    const cardInit = CardInit();

    card?.append(cardInit);
  };

  const renderCardProfile = (): void => {
    const { profile, repos } = gitHubStore.getState();

    if (!profile) {
      renderCardInit();
      return;
    }

    const card = main.querySelector<HTMLElement>(".card");
    card?.replaceChildren();

    const cardProfile = CardProfile({
      avatar_url: profile.avatar_url,
      bio: profile.bio ?? "N/A",
      followers: profile.followers ?? 0,
      following: profile.following ?? 0,
      name: profile.name ?? "N/A",
      public_repos: profile.public_repos ?? 0,
      repos: repos,
    });

    card?.append(cardProfile);
  };

  renderCardInit();

  const unsubscribe = gitHubStore.subscribe("profile", (profile) => {
    if (!profile) {
      renderCardInit();
      return;
    }
    renderCardProfile();
  });

  main.cleanup = (): void => {
    formSearch?.removeEventListener("submit", handleFormSubmit);

    unsubscribe();

    clearAlert();
  };

  return main;
};
