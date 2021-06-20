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
      snapshot.forEach(doc => {
          let html = "";
            const datos = doc.data();
            const nombre = cod(datos.nombre);
            const autor = cod(datos.aut);
            const enlace = await storage.ref(nombre).getDownloadURL();
            html += /* html */
            `<li>
                <a class="fila" href="${enlace}">
                    <span class="texto">
                    <strong class="primario">${cod(doc.id)}<br>${autor}</strong>
                    </span>
                </a>
            </li>`;
        
         lista.innerHTML = html;
      })
    },
    error => console.error(error));
