let timeoutAlert: number | null = null;

export const setAlert = (message: string): void => {
  const alertRoot = document.querySelector<HTMLDivElement>(".alert");
  const alertH2 = document.querySelector<HTMLHeadingElement>(".alert__text");

  if (!alertRoot || !alertH2) return;

  if (timeoutAlert !== null) {
    clearTimeout(timeoutAlert);
    timeoutAlert = null;
  }

  alertH2.innerHTML = message;
  alertRoot.style.opacity = "100";

  timeoutAlert = setTimeout(() => {
    alertRoot.style.opacity = "0";
    timeoutAlert = null;
  }, 2000);
};

export const clearAlert = (): void => {
  if (timeoutAlert !== null) {
    clearTimeout(timeoutAlert);
    timeoutAlert = null;
  }

  const alertRoot = document.querySelector<HTMLDivElement>(".alert");
  const alertH2 = document.querySelector<HTMLHeadingElement>(".alert__text");

  if (alertRoot && alertH2) {
    alertH2.innerHTML = "";
    alertRoot.style.opacity = "0";
  }
};
