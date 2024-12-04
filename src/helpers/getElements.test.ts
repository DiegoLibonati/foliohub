import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const {
    alertContainer,
    alertH2,
    buttonSearchProfile,
    containerCardInit,
    containerCardProfile,
    descriptionProfile,
    followersProfile,
    followingProfile,
    imgProfile,
    inputSearchProfile,
    listReposContainer,
    nameProfile,
    reposContainer,
    reposProfile,
  } = getElements();

  expect(alertContainer).toBeInTheDocument();
  expect(alertH2).toBeInTheDocument();
  expect(buttonSearchProfile).toBeInTheDocument();
  expect(containerCardInit).toBeInTheDocument();
  expect(containerCardProfile).toBeInTheDocument();
  expect(descriptionProfile).toBeInTheDocument();
  expect(followersProfile).toBeInTheDocument();
  expect(followingProfile).toBeInTheDocument();
  expect(imgProfile).toBeInTheDocument();
  expect(inputSearchProfile).toBeInTheDocument();
  expect(listReposContainer).toBeInTheDocument();
  expect(nameProfile).toBeInTheDocument();
  expect(reposContainer).toBeInTheDocument();
  expect(reposProfile).toBeInTheDocument();
});
