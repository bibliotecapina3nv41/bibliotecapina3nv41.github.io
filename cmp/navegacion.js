const firestore = firebase.firestore();
const refUsr = firestore.collection("Usuario");
const refCol = firestore.collection("Rol");
const auth = firebase.auth();
  
  class Navegacion extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<ul>
          <li>
            <a href="index.html">
              Sesión</a>
          </li>
        </ul>`;
        if(refUsr.rolIds.has("Administrador")){
          html += /* html */
          `<ul>
          <li>
            <a href=
              "gratuitos.html">Gratuitos</a>
          </li>
          <li>
            <a href=
               "Miembros.html">Miembros</a>
          </li>
          </ul>`;
        }
      }
    }
  
  
  customElements.define(
    "c-navegacion", Navegacion);
  