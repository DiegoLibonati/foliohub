import { SubTitleProps } from "@src/entities/props";

export const SubTitle = ({
  id,
  className,
  children,
}: SubTitleProps): HTMLHeadingElement => {
  const heading = document.createElement("h3");
  heading.className = `text-white ${className ?? ""}`;
  heading.id = id;

  heading.innerHTML = children ?? "";

  return heading;
};
