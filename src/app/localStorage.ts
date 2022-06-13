function getUser() {
    return JSON.parse(String(localStorage.getItem("user")));
}

function nuevoUser(user:string) {
  let jugadores = localStorage.getItem("User");

  if (jugadores == null) {
      localStorage.setItem("User", user);
  } else {
      jugadores = JSON.parse(jugadores);
  }
}

export { getUser, nuevoUser };
