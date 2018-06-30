import React from 'react';

//====================================================


class GroceryListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    console.log(`Render GroceryListEntry`, this.props);
    return (
      <div>
        GroceryListEntry
<button onClick={() => { console.log(this.state) }} >GroceryListEntry State</button>
        <button onClick={() => { console.log(this.props) }} >GroceryListEntry Props</button>
      </div>
    )
  }
}
export default GroceryListEntry;