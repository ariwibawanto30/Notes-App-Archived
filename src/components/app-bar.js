class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  updateStlye() {
    this._style.textContent = `
        :host {
          display: block;
        }
        form {
            text-align: center;
            display: block;
            margin: 0 auto;
            padding: 10px;
        }

        input {
            width: 1000px;
            height: 35px;
            background-color: #f1f1f1;
            border: none;
            border-radius: 10px;
            padding-left: 20px;
        }

        input::placeholder {
            letter-spacing: 1px;
        }

        .btn {
            padding: 8px 12px;
            border-radius: 7px;
            border: none;
            background-color: #3dc2ec;
            color: #fff;
            cursor: pointer;
        }

        .btn:hover {
            background-color: #0f7493;
            color: #fff;
        }
            
        @media screen and (max-width: 1200px) {
            input {
              width: 70%;
            }
        }
    `;
  }

  render() {
    this.updateStlye();
    const template = `
        ${this._style.outerHTML}
        <form action="">
          <input type="search" name="search" id="search" placeholder="Search" />
          <button class="btn">Search</button>     
      </form>
    `;
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += template;
  }
}

customElements.define("app-bar", AppBar);
