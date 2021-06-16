class MiNav extends HTMLElement {
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
      getAuth().onAuthStateChanged(
        usuario => this.
          cambiaUsuario(usuario),
        muestraError);
    }
  
    /**
     * @param {import(
        "../lib/tiposFire.js").User}
        usu */
    async cambiaUsuario(usu) {
      if (usu && usu.email) {
        let html = "";
        const roles =
          await cargaRoles(
            usu.email);
        /* Enlaces para solo
         * para clientes. */
        if (roles.has("Ugratuito")) {
          html += /* html */
            `<li>
              <a href="gratuitos.html">Libros gratis</a>
            </li>`;
        }
        /* Enlaces para solo
         * administradores.
         */
        if (roles.has(
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
  }
  
  customElements.define(
    "navegacion", navegacion);