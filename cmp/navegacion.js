const firestore = firebase.firestore();
const refUsr = firestore.collection("Usuario");
const refRol = firestore.collection("Rol");
const correo = firebase.auth().onAuthStateChanged(usuario => usuario.email);

  
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
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            let html = "";
            const roles = await cargaRoles(correo);
            if (roles.has("Administrador")) {
              html += /* html */
                `<li>
                  <a href=
                    "gratuitos.html">Gratuitos</a>
                </li>`;
            }
            this.ul.innerHTML += html;
            }

           else {
            console.error();
          }
        });
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

  
  customElements.define(
    "c-navegacion", Navegacion);
  