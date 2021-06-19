const firestore = firebase.firestore();
const refLib = firestore.collection("Libros");
const storage = firebase.storage();



refLib.onSnapshot(
    snapshot => {
      console.log(snapshot.size);
      snapshot.forEach(document => {
        console.log(document.id);
        const datos = document.data();
        console.log(datos);
      })
    },
    error => console.error(error));