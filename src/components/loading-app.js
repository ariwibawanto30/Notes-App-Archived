class LoadingApp extends HTMLElement {
  shadowRoot = null;
  _style = null;
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    this.render();
  }

  emptyElement() {
    this.shadowRoot.innerHTML = "";
  }

  updateStyle() {
    this._style.textContent = `
            .loading {
                font-size: 25px;
                font-weight: bold;
                text-transform: uppercase;
                color: blue;
                text-align: center;
                margin: 20px auto;
            }
        `;
  }

  render() {
    this.emptyElement();
    this.updateStyle();
    this.shadowRoot.appendChild(this._style);
    this.shadowRoot.innerHTML += `
    <div class="loading">
    Loading...
    </div>
    `;
  }
}

customElements.define("loading-app", LoadingApp);
