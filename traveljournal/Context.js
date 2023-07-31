// import {createContext, useState, useRef, useEffect} from 'react';

// const SocketContext = createContext();

// const ContextProvider = ({children}) => {
//   const [imageSources, setImageSources] = useState([]);
//   const cardObject = {
//     id: 'unique_card_id', // A unique identifier for the card (you can use any method to generate unique IDs)
//     title: 'Card Title',
//     description: 'Card Description',
//     images: ['image_uri_1', 'image_uri_2', 'image_uri_3'],
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         imageSources,
//         setImageSources,
//       }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export {ContextProvider, SocketContext};
