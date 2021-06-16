const firestore = firebase.firestore();
const refRol = firestore.collection("Rol");
const refUsr = firestore.collection("Usuario");
const auth = firebase.auth();


class Navegacion extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<ul>
          <li>
            <a href="index.html">
              Inicio</a>
          </li>
        </ul>`;
      this.ul =
        this.querySelector("ul");
        auth.onAuthStateChanged(
        usuario => this.
          cambiaUsuario(usuario),
        muestraError);
    //}
  

        if (refRol.has("Ugratuito")) {
          html += /* html */
            `<li>
              <a href="gratuitos.html">Libros gratis</a>
            </li>`;
        }
        /* Enlaces para solo
         * administradores.
         */
        if (refRol.has(
          "Administrador")) {
          html += /* html */
            `<li>
              <a href="miembros.html">Libros premium</a>
            </li>
            <li>
              <a href="usuarios.html">Usuarios</a>
            </li>`;
        }
        this.ul.innerHTML += html;
    }
}
  customElements.define(
    "navegacion", Navegacion);