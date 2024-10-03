class FormInput extends HTMLElement {
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

  emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  updateStyle() {
    this._style.textContent = `
        :host {
            display: block;
        }
        .form-input-notes {
          width: 500px;
          border-radius: 20px;
          margin: 0 auto;
          text-align: center;
          padding: 10px 20px 20px;
          background-color: #fff;
          box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-control {
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: start;
        }

        .form-input-notes h2 {
          text-transform: uppercase;
          text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.5);
        }

        .form-control label {
          color: #444;
          font-weight: bold;
        }

        .form-control input[type="text"] {
          height: 35px;
          border-radius: 5px;
        }

        .form-control p {
          margin: 5px 0;
          font-size: 14px;
          color: red;
        }

        .form-control textarea {
          height: 80px;
          border-radius: 5px;
        }

        .form-input-notes .save {
          font-weight: bold;
          font-size: 15px;
          text-transform: uppercase;
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

        @media screen and (max-width:600px) {
          .form-input-notes {
            width: 80%;
          }
        } 
    `;
  }

  customValidationHandler(event) {
    event.target.setCustomValidity("");
    if (event.target.validity.valueMissing) {
      event.target.setCustomValidity("Wajib Di Isi");
      return;
    }
    if (event.target.validity.tooShort) {
      event.target.setCustomValidity("Minimal Panjang Harus 6 Karakter");
      return;
    }
    if (event.target.validity.patternMismatch) {
      event.target.setCustomValidity("Tidak Boleh Di Awali dengan Simbol");
      return;
    }
  }

  customHandler() {
    const form = this._shadowRoot.querySelector("form");
    const titleInput = form.elements.title;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    titleInput.addEventListener("invalid", this.customValidationHandler);
    titleInput.addEventListener("change", this.customValidationHandler);
    titleInput.addEventListener("blur", (e) => {
      const isValid = e.target.validity.valid;
      const errorMessage = e.target.validationMessage;
      const connectedValidationId = e.target.getAttribute("aria-describedby");
      const connectedValidationEl = this._shadowRoot.getElementById(
        connectedValidationId,
      );

      if (connectedValidationEl && errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = "";
      }
    });
  }

  render() {
    this.emptyContent();
    this.updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div>    
    <form action="" id="formInputNotes" class="form-input-notes">
        <h2>Form Input Notes</h2>
        <div class="form-control">
          <label for="title">Judul Note*</label>
          <input type="text" name="title" id="title" pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$" minlength="6" required aria-describedby="inputTitleValidation" required />
          <p id="inputTitleValidation" class="validationMessage"></p>
        </div>
        <div class="form-control">
          <label for="body">Deskripsi</label>
          <textarea name="body" id="body"></textarea>
        </div>
        <button type="submit" class="btn save">Save</button>
        </form>
        </div>
        `;
    this.customHandler();
  }
}

customElements.define("form-input", FormInput);
