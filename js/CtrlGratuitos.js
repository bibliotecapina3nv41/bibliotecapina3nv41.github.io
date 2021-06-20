import {
    cod,
    muestraError
  } from "../lib/util.js";

const firestore = firebase.firestore();
const refLib = firestore.collection("Libros");
const storage = firebase.storage();
const lista = document.querySelector("#lista");

getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
    if (usuario && usuario.email) {
      consulta();
    }
  }

  function consulta() {
    refLib.onSnapshot(htmlLista, errConsulta);
  }


  async function htmlLista(snap) {
    let html = "";
    if (snap.size > 0) {
      let libros = [];
      snap.forEach(doc => libros.push(htmlFila(doc)));
      const htmlFilas = await Promise.all(libros);
      html += htmlFilas.join("");
    } else {
      html += /* html */
        `<li class="vacio">
          -- No se encontraron archivos. --
        </li>`;
    }
    lista.innerHTML = html;
  }

  async function htmlFila(doc) {
    const datos = doc.data();
    const nombre = cod(datos.nombre);
    const autor = cod(datos.aut);
    const enlace = cod(await storage.ref(nombre).getDownloadURL());
    return (/* html */
        `<li>
        <a class="fila" href="${enlace}">
            <span class="texto">
            <strong class="primario">${cod(doc.id)}<br>${autor}</strong>
            </span>
        </a>
    </li>`);
  }

  function errConsulta(e) {
    muestraError(e);
    consulta();
  }
