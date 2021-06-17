const firestore = firebase.firestore();
const refUsr = firestore.collection("Usuario");
const refRol = firestore.collection("Rol");
//const correo = firebase.auth().onAuthStateChanged(usuario => usuario.email);

  
  class Navegacion extends HTMLElement {
    connectedCallback() {
      this.innerHTML = /* html */
        `<ul>
          <li>
            <a href="index.html">
              Sesión</a>
          </li>
        </ul>`;
        this.ul = this.querySelector("ul");
        //const auth = firebase.auth();
        firebase.auth().onAuthStateChanged(usuario => this.cambiaUsuario(usuario), muestraError);
        }
      }

      async function cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles = await cargaRoles(usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (roles.has("Cliente")) {
            html += /* html */
              `<li>
                <a href="gratuitos.html">Gratuitos</a>
              </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has("Administrador")) {
            html += /* html */
              `<li>
                <a href="miembros.html">Miembros</a>
              </li>`;
          }
          this.ul.innerHTML += html;
        }
      }

  async function cargaRoles(mail){
    const roles = await refUsr.doc(mail).get();
                if (roles.exists) {
                  const datos = roles.data();
                  return new Set(
                    datos.rolIds || []);
                    
                } else {
                  return new Set();
                }
    }

    function muestraError(e) {
      console.error(e);
      alert(e.message);
    }
  
  customElements.define(
    "c-navegacion", Navegacion);
  