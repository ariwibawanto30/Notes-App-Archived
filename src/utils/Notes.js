import { notesData } from "../data/notes.js";

class Notes {
  static getAll() {
    return notesData;
  }

  static searchNotes(query) {
    return notesData.filter((data) => {
      const lowerCaseNote = (data.title || "-").toLowerCase();
      const jammedNotes = lowerCaseNote.replace(/\s/g, "");
      const lowerCaseQuery = query.toLowerCase();
      const jammedQuery = lowerCaseQuery.replace(/\s/g, "");
      return jammedNotes.indexOf(jammedQuery) !== -1;
    });
  }
}

export default { Notes };
