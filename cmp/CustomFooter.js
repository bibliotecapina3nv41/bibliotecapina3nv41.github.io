class Cfooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Jose Arturo Piña - 
        Programación Web 3NV41 - 
        UPIICSA.
      </p>`;
  }
}

customElements.define(
  "c-footer", Cfooter);