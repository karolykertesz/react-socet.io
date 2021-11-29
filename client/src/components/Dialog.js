import React, { useReducer } from "react";
const initialState = {
  assignedTo: "",
  notes: "",
  priority: "",
  title: "",
  error: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "assignedTo":
      return {
        ...state,
        assignedTo: action.payload,
      };
    case "notes":
      return {
        ...state,
        notes: action.payload,
      };
    case "priority":
      return {
        ...state,
        priority: action.payload,
      };
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    case "reset":
      return (state = initialState);
    default:
      return state;
  }
};

const Dialog = ({ addUsers, setOpen }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const formSubmit = (e) => {
    dispatch({ type: "error", payload: null });
    e.preventDefault();
    if (!state.assignedTo || !state.title || !state.priority || !state.notes)
      return dispatch({ type: "error", payload: "Missing input values" });
    addUsers(state);
    dispatch({ type: "reset" });
  };
  return (
    <div className="dialog-cover">
      <dialog open={true} className="dia">
        <div className="close-dialog">
          <span onClick={() => setOpen(false)}>X</span>
        </div>

        <form className="form" onSubmit={formSubmit}>
          <div className="dialog-input">
            <label htmlFor="assign">Assigned To</label>
            <input
              type="text"
              id="assign"
              value={state.assignedTo}
              onChange={(e) =>
                dispatch({ type: "assignedTo", payload: e.target.value })
              }
            />
          </div>
          <div className="dialog-input">
            <label htmlFor="notes">Notes</label>
            <input
              type="text"
              id="notes"
              value={state.notes}
              onChange={(e) =>
                dispatch({ type: "notes", payload: e.target.value })
              }
            />
          </div>
          <div className="dialog-input">
            <label htmlFor="priority">Priority</label>
            <input
              type="text"
              id="priority"
              value={state.priority}
              onChange={(e) =>
                dispatch({ type: "priority", payload: e.target.value })
              }
            />
          </div>
          <div className="dialog-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: "title", payload: e.target.value })
              }
            />
          </div>
          <div className="form-buttons">
            <button className="send" type="submit">
              send
            </button>
          </div>
        </form>
        {state.error && <div className="dialog-error">{state.error}</div>}
      </dialog>
    </div>
  );
};
export default Dialog;
