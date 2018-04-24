import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Gun from './testRedux';

ReactDOM.render(<Gun />, document.getElementById('root'));
registerServiceWorker();
