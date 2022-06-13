function getJugador() {
    return JSON.parse(String(localStorage.getItem("user")));
}

function nuevoJugador(user:string) {
  let jugadores = localStorage.getItem("Jugador");

  if (jugadores == null) {
      localStorage.setItem("Jugador", user);
  } else {
      jugadores = JSON.parse(jugadores);
  }
}

export { getJugador, nuevoJugador };
