export const ADD_NOTE = `
  mutation AddNote($content: String!) {
    addNote(content: $content) {
      _id
      content
    }
  }
`;

export const UPDATE_NOTE = `
  mutation UpdateNote($_id: ID!, $content: String!) {
    updateNote(
      _id: $_id,
      content: $content
    ) {
      _id
      content
    }
  }
`;

export const DELETE_NOTE = `
  mutation DeleteNote($_id: ID!) {
    deleteNote(
      _id: $_id
    ) {
      _id
      content
    }
  }
`;
