  import {
    getString,
    muestraError,
    muestraMiembros,
    subeStorage
  } from "../lib/util.js";

  const firestore = firebase.firestore();
  const refLib = firestore.collection("Libros");
  const storage = firebase.storage();
  const forma = document["forma"];
  
  firebase.auth().onAuthStateChanged(valida, muestraError);

 async function valida(usuario){
      if(usuario && usuario.email){
         forma.addEventListener("submit", guarda);
      }
    }
  

 async function guarda(){
    try{
        Event.preventDefault();
        const formData = new FormData(forma);
        const nombre = getString(formData, "nomLibr").trim();
        console.log(nombre);
        const aut = getString(formData, "autor").trim();
        console.log(aut);
        const data = {
            nombre,
            aut
        };
        await refLib.doc(nombre).set(data);
        const libroC = formData.get("libroCarga");
        await subeStorage(nombre, libroC);
        muestraMiembros();
    } catch{
        muestraError(e);
    }
}





