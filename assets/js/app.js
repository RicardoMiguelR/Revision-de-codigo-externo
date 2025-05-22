const baseEndpoint = "https://api.github.com";
const usersEndpoint = `${baseEndpoint}/users`;
const $n = document.querySelector(".name"); // <- Se corrige la clase (se agrega el punto)
const $b = document.querySelector(".blog"); // <- Se corrige la clase (se agrega el punto)
const $l = document.querySelector(".location"); // <- Se corrige la clase (se agrega el punto)

// Aqui agregue una funcion promesa async/await para manejar solo el fetch de la url, con el parametro de username ->
const getData = async (username) => {
  try {
    const response = await fetch(`${usersEndpoint}/${username}`);
    if (!response.ok) {
      return new Error("Ocurrio un error, no se puede acceder a los datos");
    } else {
      return await response.json();
    }
  } catch (error) {
    return error;
  }
};

// Funcion para mostrar los usuarios en la interfaz, con el parametro de username, manejamos con async/await y try/catch como promesa ->
const displayUser = async (username) => {
  $n.textContent = "cargando...";
  try {
    const data = await getData(username);
    console.log(data); // <- solo se corrobora en consola que se obtienen los datos
    $n.textContent = `${data.name}`; // <- se agregan las bactics en cada variable
    $b.textContent = `${data.blog}`; // <- se agregan las bactics en cada variable
    $l.textContent = `${data.location}`; // <- se agregan las bactics en cada variable
  } catch (error) {
    handleError(error); // <- se maneja con el error de la funcion handleError
  }
};

const handleError = (err) => {
  console.log("OH NO!");
  console.log(err);
  $n.textContent = `Algo salió mal: ${err}`; // <- se corrije la variable $n
};

displayUser("stolinski").catch(handleError);
