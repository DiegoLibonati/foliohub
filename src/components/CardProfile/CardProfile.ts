import type { CardProfileProps } from "@/types/props";
import type { CardProfileComponent } from "@/types/components";

import { SubTitle } from "@/components/SubTitle/SubTitle";
import { ItemLinkRepo } from "@/components/ItemLinkRepo/ItemLinkRepo";

export const CardProfile = ({
  avatar_url,
  name,
  bio,
  followers,
  following,
  public_repos,
  repos,
}: CardProfileProps): CardProfileComponent => {
  const divRoot = document.createElement("div");
  divRoot.className =
    "flex flex-col items-center justify-center w-[90%] h-full bg-secondary rounded-lg p-4 md:w-[55%] xl:w-[40%] 2xl:w-[35%] card-profile";

  divRoot.innerHTML = `
        <div class="flex flex-col items-center justify-center w-full h-auto card__content">
            <div class="flex flex-col items-center justify-center w-full h-full xl:flex-row">
                <div class="flex items-center justify-center w-full h-full">
                    <img
                        src="${avatar_url}"
                        alt="${name}'s GitHub profile avatar"
                        id="img-profile"
                        class="h-32 w-32 rounded-full object-cover"
                    />
                </div>

                <div class="flex flex-col items-center justify-center w-full h-full">
                    <h2 class="text-white text-2xl font-semibold" id="name-profile">${name}</h2>

                    <p
                        id="description-profile"
                        class="text-white text-center text-base mt-2"
                    >${bio}</p>
                </div>
            </div>

            <div aria-label="Profile statistics" class="flex flex-row justify-around w-full mt-4 card__content-stats">
            </div>

            <div class="flex flex-col items-start justify-center w-full h-auto mt-4 card__repos">
                <h3 class="text-white font-semibold">Repositories</h3>
                <ul aria-label="Repository list" class="flex flex-wrap flex-row items-center justify-center w-full mt-2 card__repos-list"></ul>
            </div>
        </div>
    `;

  const cardContentStats = divRoot.querySelector<HTMLDivElement>(
    ".card__content-stats"
  );
  const cardRepos =
    divRoot.querySelector<HTMLUListElement>(".card__repos-list");

  const followersElement = SubTitle({
    id: "followers-profile",
    children: `${followers} <span class="font-semibold"> Followers</span>`,
  });

  const followingElement = SubTitle({
    id: "following-profile",
    children: `${following} <span class="font-semibold"> Following</span>`,
  });

  const reposElement = SubTitle({
    id: "repos-profile",
    children: `${public_repos} <span class="font-semibold"> Repos</span>`,
  });

  cardContentStats?.append(followersElement, followingElement, reposElement);

  repos.forEach((repo) => {
    const itemLinkRepo = ItemLinkRepo({ name: repo.name, href: repo.html_url });
    cardRepos?.append(itemLinkRepo);
  });

  return divRoot;
};
