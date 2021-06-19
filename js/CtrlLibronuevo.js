  import {
    getString,
    muestraError,
    muestraMiembros
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
        var libroC = formData.get("libroCarga");
        await storage.ref(nombre).put(libroC);
        muestraMiembros();
    } catch{
        muestraError(e);
    }
}





