import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.setState({
      tasks: this.props.tasks
    })
  }


}

export default OrderForm;