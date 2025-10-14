let timeoutAlert: NodeJS.Timeout | null;

export const setAlert = (message: string): void => {
  const alertRoot = document.querySelector<HTMLDivElement>(".alert");
  const alertH2 = document.querySelector<HTMLHeadingElement>(".alert__text");

  alertH2!.innerHTML = message;
  alertRoot!.style.opacity = "100";

  timeoutAlert = setTimeout(() => {
    alertRoot!.style.opacity = "0";
  }, 2000);
};
