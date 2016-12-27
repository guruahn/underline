import React, { Component } from 'react';
import Counter from './Counter';
import Search from './Search';

class App extends Component {

    render() {
        return(
          <div>
            <Counter />
            <Search />
          </div>

        );
    }
}
export default App;
