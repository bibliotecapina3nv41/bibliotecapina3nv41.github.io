  import {
    getString,
    muestraError,
    muestraMiembros
  } from "../lib/util.js";

  const firestore = firebase.firestore();
  const refLib = firestore.collection("Libros");
  const storage = firebase.storage();
  const forma = document["forma"];
  var estatus = document.getElementById("estatus");
  
 forma.addEventListener("submit", guarda);
    
 async function guarda(evt){
    try{
        evt.preventDefault();
        estatus.textContent = "Subiendo libro...";
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
        const Sarch = formData.get("libroCarga");
        var metadata = {
          contentType: 'application/pdf',
        };
        await storage.ref(nombre).put(Sarch, metadata);
        muestraMiembros();
      } catch {
        muestraError(e);
      }

}

