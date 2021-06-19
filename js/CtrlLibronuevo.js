  import {
    getString,
    muestraError
  } from "../lib/util.js";

  const firestore = firebase.firestore();
  const docRef = firestore.collection("Libros");
  const sto = firebase.storage();
  const forma = document["forma"];
  
  firebase.auth().onAuthStateChanged(valida, muestraError);

  async function valida(){
    forma.addEventListener("submit", guarda);
  }

  /** @param {Event} evt */
 async function guarda(Event){
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
        await subeStorage(nombre, libroC);
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

function muestraMiembros(){
  location.href = "miembros.html";
}


