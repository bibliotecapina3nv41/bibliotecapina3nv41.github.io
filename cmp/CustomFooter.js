class Cfooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Biblioteca Beta.
      </p>`;
  }
}

customElements.define(
  "c-footer", Cfooter);