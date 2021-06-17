import {
  muestraError
} from "../lib/util.js";

const firestore = firebase.firestore();
const docRef = firestore.collection("Usuario");
//const correo = firebase.auth().onAuthStateChanged(usuario => usuario.email);

  
  class Navegacion extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<ul>
          <li>
            <a href="index.html">
              Inicio</a>
          </li>
        </ul>`;
        this.ul = this.querySelector("ul");
        //const auth = firebase.auth();
        firebase.auth().onAuthStateChanged(usuario => this.cambiaUsuario(usuario), muestraError);
        }

      async cambiaUsuario(usu){
        if (usu && usu.email) {
          console.log(usu.email);
          let html = "";
          const rol = await cargaRoles(usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (rol.has("Ugratuito")) {
            html += /* html */
              `<li>
                <a href="gratuitos.html">Gratuitos</a>
              </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (rol.has("Administrador")) {
            html += /* html */
              `<li>
                <a href="miembros.html">Miembros</a>
              <li>`;
          }
          this.ul.innerHTML += html;
        

          async function cargaRoles(correo){
            const roles = await docRef.doc(correo).get();
                        if (roles.exists) {
                          const datos = roles.data();
                          console.log(datos);
                          return new Set(datos.rolIds || []);
                          } else {
                            return new Set();
                           }
        }

        
      }
    }

//console.log(docRef.doc("Usuarios"));

  }
  
  customElements.define(
    "c-navegacion", Navegacion);
  