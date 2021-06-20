import {
    getString,
    muestraError,
    muestraAdmin
  } from "../lib/util.js";


const firestore = firebase.firestore();
  const refLib = firestore.collection("Libros");
  const storage = firebase.storage();
  const forma = document["forma"];
  var estatus = document.getElementById("estatus");

  forma.addEventListener("submit", elimina);

  async function elimina(evt) {
    try {
        evt.preventDefault();
        if (confirm("Confirmar la " + "eliminación")) {
            const formData = new FormData(forma);
            const nombre = getString(formData, "nomLibr").trim();
            estatus.textContent = "Eliminando...";
            await refLib.doc(nombre).delete();
            await storage.ref(nombre).delete();
            muestraAdmin();
        }
        } catch (e) {
        muestraError(e);
        }
  }

