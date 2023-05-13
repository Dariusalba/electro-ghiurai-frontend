import React, { Component } from 'react';

class ManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  handleFileInputChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    fetch('http://localhost:9191/mng/finish/order/61', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleFileInputChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ManagerDashboard;
