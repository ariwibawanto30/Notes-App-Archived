const baseURL = "https://notes-api.dicoding.dev/v2";
import { showResponMessage, reload } from "../../utils/utils";
import Swal from "sweetalert2";

class NotesAPI {
  static async getAllNotes() {
    const response = await fetch(`${baseURL}/notes`);
    const responseJson = await response.json();
    if (!response.status >= 200 && !response.status < 300) {
      throw new Error("Something New Error");
    }
    const notes = responseJson.data;
    if (notes.length > 0) {
      return notes;
    }
  }

  static async getAllNotesArchived() {
    const response = await fetch(`${baseURL}/notes/archived`);
    const responseJson = await response.json();
    if (!response.status >= 200 && !response.status < 300) {
      throw new Error("Something New Error");
    }
    const notesArchived = responseJson.data;
    if (notesArchived.length > 0) {
      return notesArchived;
    }
  }

  static async createNotes(note) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };
      const response = await fetch(`${baseURL}/notes`, options);
      const responseJson = await response.json();
      Swal.fire({
        position: "center",
        icon: "success",
        title: responseJson.message,
        showConfirmButton: false,
        timer: 2000,
      });
      reload();
      this.getAllNotes();
    } catch (error) {
      showResponMessage(error.message);
    }
  }

  static async archivedNote(noteId) {
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${baseURL}/notes/${noteId}/archive`,
        options,
      );
      const responseJson = await response.json();
      Swal.fire({
        title: "Success",
        text: `${responseJson.message}`,
        icon: "success",
      });
      reload();
      this.getAllNotesArchived();
    } catch (error) {
      showResponMessage(error.message);
    }
  }

  static async unArchivedNote(noteId) {
    try {
      const options = {
        method: "POST",
      };
      const response = await fetch(
        `${baseURL}/notes/${noteId}/unarchive`,
        options,
      );
      const responseJson = await response.json();
      Swal.fire({
        title: "Success",
        text: `${responseJson.message}`,
        icon: "success",
      });
      reload();
    } catch (error) {
      showResponMessage(error.message);
    }
  }

  static async deleteNote(noteId) {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(`${baseURL}/notes/${noteId}`, options);
      const responseJson = await response.json();
      Swal.fire({
        title: "Success",
        text: `${responseJson.message}`,
        icon: "success",
      });
      this.getAllNotes();
      reload();
    } catch (error) {
      showResponMessage(error.message);
    }
  }
}

export default NotesAPI;
