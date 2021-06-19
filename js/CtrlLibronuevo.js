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

  function valida(usuario){
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
        const libroC = formData.get("libroCarga");
        subeStorage(nombre, libroC);
        await refLib.doc(nombre).set(data);
        
        
        muestraMiembros();
    } catch{
        muestraError(e);
    }
}





