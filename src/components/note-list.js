class NoteList extends HTMLElement {
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

        .container {
            display: grid;
            grid-template-columns: repeat(3, 400px);
            gap: 3rem;
            justify-content: center;
            margin: 3rem 0;
        }

        @media screen and (max-width: 1200px) {
         .container {
            grid-template-columns: 400px 400px;
         }
        }

        @media screen and (max-width: 900px) {
         .container {
            grid-template-columns: 600px;
         }
        @media screen and (max-width: 550px) {
         .container {
            grid-template-columns: 1fr;
            margin: 0 20px;
         }


        }
    `;
  }

  render() {
    this.updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="container">
            <slot></slot>
        </div>
    `;
  }
}

customElements.define("note-list", NoteList);
