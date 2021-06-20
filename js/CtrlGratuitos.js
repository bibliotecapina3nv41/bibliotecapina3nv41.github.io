import {
    cod,
    muestraError
  } from "../lib/util.js";

const firestore = firebase.firestore();
const refLib = firestore.collection("Libros");
const storage = firebase.storage();
const lista = document.querySelector("#lista");



refLib.onSnapshot(
    snapshot => {
      snapshot.forEach(document => {
          let html = "";
          if(snapshot.size > 0){
            const datos = document.data();
            const nombre = cod(datos.nombre);
            const autor = cod(datos.aut);
            const enlace = storage.ref(nombre).getDownloadURL();
            html += /* html */
            `<li>
                <a class="fila" href="${enlace}">
                    <span class="texto">
                    <strong class="primario">${cod(document.id)}<br>${cod(document.id)}</strong>
                    </span>
                </a>
            </li>`
        } else {
            html += /* html */
                `<li class="vacio">
                    -- No se encontraron archivos --
                </li>`;
        }
         lista.innerHTML = html;
      })
    },
    error => console.error(error));