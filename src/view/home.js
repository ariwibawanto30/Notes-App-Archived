import {
  hideElement,
  showElement,
  showResponMessage,
  sleep,
} from "../utils/utils.js";
import NotesAPI from "../data/remote/notes-api.js";

const home = () => {
  const noteListComponent = document.querySelector("note-list");
  const archivedListElement = document.querySelector("archived-list");
  const loading = document.querySelector("loading-app");
  const form = document.querySelector("form-input");
  const formInput = form.shadowRoot.querySelector(".form-input-notes");

  const showNotes = () => {
    showElement(loading);
    NotesAPI.getAllNotes()
      .then(sleep)
      .then((result) => {
        displayResult(result);
      })
      .catch((error) => {
        showResponMessage(error.message);
      })
      .finally(() => {
        hideElement(loading);
      });
  };

  const showArchivedNotes = () => {
    showElement(loading);
    NotesAPI.getAllNotesArchived()
      .then((result) => {
        displayArchived(result);
      })
      .catch((error) => {
        showResponMessage(error.message);
      });
  };

  const addNotes = async (e) => {
    const inputTitle = form.shadowRoot.querySelector("#title").value;
    const inputBody = form.shadowRoot.querySelector("#body").value;

    e.preventDefault();
    const newNotes = {
      title: inputTitle,
      body: inputBody,
    };
    await NotesAPI.createNotes(newNotes);
  };

  const displayResult = (notesData) => {
    const noteItemElements = notesData.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;
      return noteItemElement;
    });
    noteListComponent.append(...noteItemElements);
  };

  const displayArchived = (notesArchive) => {
    const archivedItemElements = notesArchive.map((note) => {
      const archivedItemElement = document.createElement("note-item");
      archivedItemElement.note = note;
      return archivedItemElement;
    });
    archivedListElement.append(...archivedItemElements);
  };

  formInput.addEventListener("submit", addNotes);
  showNotes();
  showArchivedNotes();
};

export default home;
