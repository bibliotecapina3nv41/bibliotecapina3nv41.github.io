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
      }

      
      async function cambiaUsuario(usu){
        if (usu && usu.email) {
          //let html = "";
          const rol = await cargaRoles(usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (rol.has("Cliente")) {
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
              `<p>
                <a href="miembros.html">Miembros</a>
              </p>`;
          }
          this.ul.innerHTML += html;
        }
      }
      
console.log(docRef);

  async function cargaRoles(mail){
    const roles = await docRef.doc(mail).get();
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
  