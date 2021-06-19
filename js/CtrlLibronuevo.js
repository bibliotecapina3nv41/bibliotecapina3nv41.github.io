  import {
    getString,
    muestraError
  } from "../lib/util.js";

  const docRef = firestore.collection("Libros");
  const sto = firebase.storage();
  const forma = document["forma"];
  forma.addEventListener("submit", valida);

  async function valida(){
  firebase.auth().onAuthStateChanged(guarda, muestraError);
  }

 async function guarda(){
    try{
        const formData = new FormData(forma);
        const nombre = getString(formData, nomLibr).trim();
        const aut = getString(formData, autor).trim();
        const data = {
            nombre,
            aut
        }
        await docRef.doc(nombre).set(data);
        const libroC = formData.get("libroCarga");
        await subeStorage(id, libroC);
        muestraMiembros();
    } catch{
        muestraError(e);
    }
}

async function subeStorage(nombre, archivo) {
  if (archivo instanceof File && archivo.size > 0) {
    await sto.ref(nombre).put(archivo);
  }
}

function muestraMiembros() {
  location.href = "miembros.html";
}


