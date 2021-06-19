  import {
    getString,
    muestraError
  } from "../lib/util.js";

  const firestore1 = firebase.firestore();
  const refLib = firestore1.collection("Libros");
  const sto = firebase.storage();
  const forma = document["forma"];
  
  firebase.auth().onAuthStateChanged(valida, muestraError);

  function valida(usuario){
      if(usuario && usuario.email){
         forma.addEventListener("submit", guarda);
      }
  

 async function guarda(){
    try{
        const formData = new FormData(forma);
        const nombre = getString(formData, nomLibr).trim();
        console.log(nombre);
        const aut = getString(formData, autor).trim();
        console.log(autor);
        const data = {
            nombre,
            aut
        };
        await refLib.doc(nombre).set(data);
        console.log(refLib.id);
        const libroC = formData.get("libroCarga");
        await subeStorage(nombre, libroC);
        muestraMiembros();
    } catch{
        muestraError(e);
    }

    async function subeStorage(nombre, archivo) {
        if (archivo instanceof File && archivo.size > 0) {
          await sto.ref(nombre).put(archivo);
        }
      }

      function muestraMiembros(){
        location.href = "miembros.html";
      }

}
  }




