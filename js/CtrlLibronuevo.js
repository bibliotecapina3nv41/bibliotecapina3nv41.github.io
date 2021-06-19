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
         muestraMiembros();
      }
    }
  

 async function guarda(){
    try{
        const formData = new FormData(forma);
        const nombre = getString(formData, "nomLibr").trim();
        console.log(nombre);
       // const nombrelib = getString(formData, "nomLibr").trim();
        const aut = getString(formData, "autor").trim();
        console.log(aut);
        const data = {
            nombre,
            aut
        };
        //const libroCarg = formData.get("libroCarga");
        //await subeStorage(nombrelib, libroCarg);
        await refLib.doc(nombre).set(data);
        
        
        
    } catch{
        muestraError(e);
    }
}





