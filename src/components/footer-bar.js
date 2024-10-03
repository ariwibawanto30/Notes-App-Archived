class FooterBar extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
        }    
        p {
            text-align: center;
            padding: 20px;
            background-color: #3dc2ec;
            color: #000;
            font-weight: bold;
        }
    `;
  }

  render() {
    this.updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <p>CopyRight &copy;Ari Wibawanto 2024</p>
    `;
  }
}

customElements.define("footer-bar", FooterBar);
