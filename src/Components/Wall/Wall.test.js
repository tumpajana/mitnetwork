import React from 'react';
import ReactDOM from 'react-dom';
import Wall from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Wall />, div);
  ReactDOM.unmountComponentAtNode(div);
});
