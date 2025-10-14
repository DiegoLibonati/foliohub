import { ItemLinkRepoProps } from "@src/entities/props";

export const ItemLinkRepo = ({
  name,
  href,
}: ItemLinkRepoProps): HTMLLIElement => {
  const li = document.createElement("li");
  li.className =
    "text-white bg-primary rounded-lg cursor-pointer py-[.2rem] px-[.3rem] mr-[.3rem] mt-[.3rem]";

  li.innerHTML = `
    <a aria-label="go to ${name}" target="_blank" href="${href}">
        ${name}
    </a>
  `;

  return li;
};
