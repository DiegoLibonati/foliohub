import type { ItemLinkRepoComponent } from "@/types/components";
import type { ItemLinkRepoProps } from "@/types/props";

const ItemLinkRepo = ({
  name,
  href,
}: ItemLinkRepoProps): ItemLinkRepoComponent => {
  const li = document.createElement("li");
  li.className =
    "text-white bg-primary rounded-lg cursor-pointer py-[.2rem] px-[.3rem] mr-[.3rem] mt-[.3rem]";

  li.innerHTML = `
    <a aria-label="Open ${name} repository on GitHub" target="_blank" href="${href}" rel="noopener noreferrer">
        ${name}
    </a>
  `;

  return li;
};

export default ItemLinkRepo;
