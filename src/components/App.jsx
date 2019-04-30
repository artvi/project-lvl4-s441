import React from 'react';
import ChannelsList from './ChannelsList';

const App = () => (
  <div className="col-5">
    <ChannelsList />
  </div>
);
export default App;
// import React from 'react';
//
// export default class App extends React.Component {
//   render() {
//     const { channels } = this.props;
//     console.log(channels)
//
//     if (channels.length === 0) {
//       return null;
//     }
//
//     return (
//       <div className="channels">
//         <ul className="list-group">
//           {channels.map(({id, name}) => (
//             <React.Fragment key={id}>
//               <li className="list-group-item">{name}</li>
//             </React.Fragment>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }
