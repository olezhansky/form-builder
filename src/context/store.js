import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppContextWrapper({ children }) {
  const [store, setStore] = useState({
    cards: [],
  });

  const updateCard = (cardId, element, action, callback) => {
    const result = store.cards.map((card) => {
      if (card.id === cardId) {
        if (action === 'ACTION_REMOVE') {
          return {
            ...card,
            elements: card.elements.filter((el) => el.id !== element.id),
          };
        }
        if (action === 'ACTION_CHANGE') {
          return {
            ...card,
            elements: card.elements.map((el) => (el.id === element.id ? callback(el) : el)),
          };
        }
        return card;
      }
      return card;
    });
    setStore({ ...store, cards: result });
  };

  return <AppContext.Provider value={{ store, setStore, updateCard }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
