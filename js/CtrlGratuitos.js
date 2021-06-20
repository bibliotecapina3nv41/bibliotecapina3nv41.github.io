import {
    cod,
    muestraError
  } from "../lib/util.js";

const firestore = firebase.firestore();
const refLib = firestore.collection("Libros");
const storage = firebase.storage();
const lista = document.querySelector("#lista");

getAuth().onAuthStateChanged(consulta, muestraError);

function consulta(){
refLib.onSnapshot(
    snapshot => {
      snapshot.forEach(doc => {
          let html = "";
          if(snapshot.size > 0){
            const datos = doc.data();
            const nombre = cod(datos.nombre);
            const autor = cod(datos.aut);
            const enlace = await storage.ref(nombre).getDownloadURL();
            html += /* html */
            `<li>
                <a class="fila" href="${cod(enlace)}">
                    <span class="texto">
                    <strong class="primario">${cod(doc.id)}<br>${cod(autor)}</strong>
                    </span>
                </a>
            </li>`;
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
}