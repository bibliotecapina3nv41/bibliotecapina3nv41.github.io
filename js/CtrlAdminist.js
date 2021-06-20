const firestore = firebase.firestore();
  const refLib = firestore.collection("Libros");
  const storage = firebase.storage();
  const forma = document["forma"];
  var estatus = document.getElementById("estatus");