// Function to save user information in session storage
export function saveUserToSessionStorage(user) {
  let userJson = JSON.stringify(user);

  sessionStorage.setItem("user", userJson);
  //   localStorage.setItem("user", userJson);
}

// Function to get user information from session storage
export function getUserFromSessionStorage() {
  let userJson = sessionStorage.getItem("user");
  //   let userJson = localStorage.getItem("user");

  let user = JSON.parse(userJson);

  return user;
}

export function deleteUserFromSessionStorage() {
  sessionStorage.removeItem("user");
}
