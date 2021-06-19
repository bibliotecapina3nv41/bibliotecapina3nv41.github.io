  import {
    getString,
    muestraError
  } from "../lib/util.js";

  const docRef = firestore.collection("Libros");
  const sto = firebase.storage();
  const forma = document["forma"];
  forma.addEventListener("submit", guarda);

 function guarda(){
    try{
        const formData = new FormData(forma);
        const id = getString(formData, nomLibr).trim();
        const aut = getString(formData, autor).trim();
        const data = {
            id,
            aut
        }
        await docRef.doc(id).set(data);
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


