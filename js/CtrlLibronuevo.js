  import {
    getString,
    muestraError
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
        const aut = getString(formData, "autor").trim();
        const data = {
            nombre,
            aut
        };
        await refLib.doc(nombre).set(data);
        const libroC = formData.get("libroCarga");
        await subeStorage(nombre, libroC);

        async function subeStorage(nombre, archivo) {
            if (archivo.size > 0) {
              await storage.ref(nombre).put(archivo);
            }
          }

        muestraMiembros();

        function muestraMiembros(){
            location.href = "miembros.html";
          }

    } catch{
        muestraError(e);
    }



}





