import type { CardInitComponent } from "@/types/components";

const CardInit = (): CardInitComponent => {
  const divRoot = document.createElement("div");
  divRoot.className =
    "flex items-center justify-center w-[90%] h-full bg-secondary rounded-lg p-2 md:w-[55%] xl:w-[40%] 2xl:w-[35%] card-init";

  divRoot.innerHTML = `
        <h1 class="text-white text-center">
            Write the name of the GitHub Profile in the input ☝️.
        </h1>
    `;

  return divRoot;
};

export default CardInit;
