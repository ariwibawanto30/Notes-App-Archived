import NotesAPI from "../data/remote/notes-api";
import Swal from "sweetalert2";
import { reload } from "../utils/utils";

class NoteItem extends HTMLElement {
  _shadoRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };
  constructor() {
    super();
    this._shadoRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  updateStyle() {
    this._style.textContent = `
        .card {
            display: block;
            border-radius: 10px;
            box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);
            padding: 20px;
            background: #f9f9f9;
            position: relative;
        }

        h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }

        p {
            font-size: 16px;
            font-weight: lighter;
            text-align: justify;
            margin: 20px 0 30px;
        }

        span {
            font-size: 14px;
            color: #777;
            position: absolute;
            bottom: 15px;
            right: 30px;
        }

        .btn  {
          color: red;
          font-size: 11px;
          padding: 10px;
          cursor: pointer;
          font-weight: bold;
          color: black;
          background-color: grey;
          border-radius: 5px;
          border: none;
          text-transform: uppercase;
        }

        .btn:hover {
          background-color: black;
          color: #fff;
        }

        #deleteBtn {
          position: absolute;
          top: 10px;
          right: 20px;
        }

        #archivedBtn {
          position: absolute;
          top: 10px;
          right: 100px;
        }

        #unArchivedBtn {
          position: absolute;
          top: 10px;
          right: 100px;
        }
    `;
  }

  emptyContent() {
    this._shadoRoot.innerHTML = "";
  }

  deleteHandler() {
    const deleteBtn = this.shadowRoot.querySelector("#deleteBtn");
    deleteBtn.addEventListener("click", async (e) => {
      const noteId = e.target.dataset.id;
      NotesAPI.deleteNote(noteId);
    });
  }

  archivedHandler() {
    const archivedBtn = this.shadowRoot.querySelector("#archivedBtn");
    archivedBtn.addEventListener("click", async (e) => {
      const noteId = e.target.dataset.id;
      await NotesAPI.archivedNote(noteId);
    });
  }

  unArchivedHandler() {
    const unArchivedBtn = this.shadowRoot.querySelector("#unArchivedBtn");
    unArchivedBtn.addEventListener("click", async (e) => {
      const noteId = e.target.dataset.id;
      await NotesAPI.unArchivedNote(noteId);
    });
  }

  render() {
    this.updateStyle();
    this.emptyContent();
    this._shadoRoot.appendChild(this._style);
    this._shadoRoot.innerHTML += `
        <div class="card">
          <button class="btn" id="${this._note.archived === true ? "unArchivedBtn" : "archivedBtn"}" data-id="${this._note.id}">${this._note.archived === true ? "Unarchived" : "Archived"}</button>
          <button class="btn" id="deleteBtn" data-id="${this._note.id}">Delete</button>
        <h3>${this._note.title}</h3>
          <hr />
          <p>${this._note.body}</p>
          <span>${this._note.createdAt}</span>
        </div>
    `;
    this.deleteHandler();
    this._note.archived === false
      ? this.archivedHandler()
      : this.unArchivedHandler();
  }
}

customElements.define("note-item", NoteItem);
