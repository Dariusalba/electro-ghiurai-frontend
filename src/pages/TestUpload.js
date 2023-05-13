import React, { Component } from 'react';

class TestUpload extends Component {
  state = {
    file: null,
    uploadStatus: null
  };

  handleFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.file);

    fetch('http://localhost:9191/mng/finish/order/61', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        this.setState({
          uploadStatus: 'File uploaded successfully'
        });
      } else {
        this.setState({
          uploadStatus: 'Error uploading file'
        });
      }
    })
    .catch(error => {
      console.error(error);
      this.setState({
        uploadStatus: 'Error uploading file'
      });
    });
  }

  handleDownload = () => {
    fetch('http://localhost:9191/mng/code/61')
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h2>File Upload</h2>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>Upload</button>
        {this.state.uploadStatus && <p>{this.state.uploadStatus}</p>}

        <h2>File Download</h2>
        <button onClick={this.handleDownload}>Download</button>
      </div>
    );
  }
}

export default TestUpload;
