import type { SubTitleComponent } from "@/types/components";
import type { SubTitleProps } from "@/types/props";

const SubTitle = ({
  id,
  className,
  children,
}: SubTitleProps): SubTitleComponent => {
  const heading = document.createElement("h3");
  heading.className = `text-white ${className ?? ""}`;
  heading.id = id;

  heading.innerHTML = children ?? "";

  return heading;
};

export default SubTitle;
