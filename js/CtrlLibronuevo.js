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
         forma.addEventListener("submit", guarda); //
      }
    
  
    
 async function guarda(evt){

   // try{
        evt.preventDefault();
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
        const Sarch = formData.get("libroCarg");
        await storage.ref(nombre).put(Sarch);
        muestraMiembros();
  /*  } catch{
        muestraError(e);
   }*/
}
}
/*
async function sube(){
    try{
        const formData = new FormData(forma);
        const nombrelib = getString(formData, "nomLibr").trim();
        const libroCarg = formData.get("libroCarga");
        await storage.ref(nombrelib).put(libroCarg);    
        
    } catch{
        muestraError(e);
    }
}*/
