import React from 'react';
import { bindAll, last } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import XHR2 from '../../scripts/xhr2.js';

import './index.scss';

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      uploading: false,
      uploadInputs: []
    };

    bindAll(this, ['clickedDropBox', 'filesChosen', 'handleUrlChange', 'handleUrlKeyUp', 'drop']);
  }

  clickedDropBox(event) {
    this.addInput();
  }

  addInput() {
    // only create a new input if a file was chosen for the last
    var last_input = last(this.uploadInputsRef.children);
    if(last_input && last_input.value == ''){
      this.openFileChooser();
      return;
    }

    var input = <input type="file" multiple="multiple" key={this.state.uploadInputs.length} onChange={this.filesChosen} />;
    this.setState((prevState) => {
      prevState.uploadInputs.push(input);

      return {
        uploadInputs: prevState.uploadInputs
      }
    }, this.openFileChooser)
  }

  openFileChooser() {
    var lastInput = last(this.uploadInputsRef.children);
    lastInput && lastInput.click();
  }

  filesChosen(event) {
    var input = event.target;
    var formData = new FormData();

    for(var i=0,y=input.files.length; i<y; i++){
      formData.append('file' + input.key + i, input.files[i]);
    }

    var xhr2 = new XHR2('POST', '/upload/file');
    xhr2.onload = () => {
      this.setState((prevState) => {
        prevState.uploadInputs.splice(input.key, 1);

        return {
          uploading: false,
          uploadInputs: prevState.uploadInputs
        }
      })
    }

    xhr2.send(formData);
    this.setState({ uploading: true });
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleUrlKeyUp(event) {
    if(event.keyCode == 13){
      var xhr2 = new XHR2('POST', '/upload/url');
      xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr2.onload = () => {
        this.setState({
          url: ''
        });
      }
      xhr2.send('url=' + this.state.url);
    }
  }

  dragEnter(event) {
    event.target.classList.add('dragging');
    event.preventDefault();
  }

  dragOver(event) {
    event.preventDefault();
  }

  dragLeave(event) {
    event.target.classList.remove('dragging');
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();

    var dropbox = event.target;
    var files = event.dataTransfer.files;

    // make sure they didnt drop another html element.
    if(files.length > 0){
      var formData = new FormData();

      for(var i=0,y=files.length; i<y; i++){
        formData.append('drop' + i, files[i]);
      }

      var xhr2 = new XHR2('POST', '/upload/file');

      xhr2.onload = () => {
        this.setState({
          uploading: false
        })

        if(xhr2.status === 204){
          dropbox.classList.remove('dragging');
        }
      };

      xhr2.send(formData);
      this.setState({ uploading: true });
    }
  }

  render() {
    return (
      <main>
        <div className="alignc space">
          <input type="text" className="url-upload" value={this.state.url} placeholder="Upload from URL..." onChange={this.handleUrlChange} onKeyUp={this.handleUrlKeyUp} />
        </div>
        <div>
          <div className="dropbox no-select" onClick={this.clickedDropBox} onDragEnter={this.dragEnter} onDragOver={this.dragOver} onDragLeave={this.dragLeave} onDrop={this.drop}>
            <div className="upload-inputs" ref={ (ele) => { this.uploadInputsRef = ele; } }>{this.state.uploadInputs}</div>
            {this.state.uploading &&
              <div>
                <FontAwesomeIcon icon="spinner" size="4x" pulse fixedWidth />
                <div className="bold">Uploading...</div>
              </div>
            }
            {!this.state.uploading &&
              <div>
                <FontAwesomeIcon icon="cloud-upload-alt" size="4x" />
                <div className="bold">Drag n&apos; drop files to upload</div>
                <div>(or click)</div>
              </div>
            }
          </div>
        </div>
      </main>
    );
  }
}
