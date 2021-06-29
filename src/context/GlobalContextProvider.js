import React from "react";

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

const initialState = {
  items: [],
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      let addedItem = action.payload;
      //check if the action id exists in the addedItems
      let existed_item = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size
      );
      if (existed_item) {
        existed_item.quantity += 1;
        existed_item.price=existed_item.quantity * existed_item.price;
        return {
          ...state,
          total: state.total + 1,
        };
      } else {
        addedItem.quantity = 1;
        //calculating the total
        let newTotal = state.total + 1;

        return {
          ...state,
          items: [...state.items, addedItem],
          total: newTotal,
        };
      }
    case "REMOVE_ITEM":
      let itemToRemove = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size
      );
      let new_items = state.items.filter(
        (item) => item.id !== itemToRemove.id || item.size !== itemToRemove.size
      );

      //calculating the total
      let newTotal = state.total - itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        items: new_items,
        total: newTotal,
      };
    case "ADD_QUANTITY": {
      let addedItem = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size
      );
      addedItem.quantity += 1;
      let newTotal = state.total + 1;
      return {
        ...state,
        total: newTotal,
      };
    }
    case "SUB_QUANTITY": {
      let addedItem = state.items.find(
        (item) =>
          action.payload.id === item.id && action.payload.size === item.size
      );
      //if the qt == 0 then it should be removed
      if (addedItem.quantity === 1) {
        let itemToRemove = state.items.find(
          (item) =>
            action.payload.id === item.id && action.payload.size === item.size
        );
        let new_items = state.items.filter((item) =>item.id !== itemToRemove.id || item.size !== itemToRemove.size);
        let newTotal = state.total-1;
        return {
          ...state,
          items: new_items,
          total: newTotal,
        };
      } else {
        addedItem.quantity -= 1;
        let newTotal = state.total - 1;
        return {
          ...state,
          total: newTotal,
        };
      }
    }
    default:
      return state;
  }
}
const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalContextProvider;
