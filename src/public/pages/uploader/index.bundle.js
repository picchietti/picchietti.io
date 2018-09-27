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

    bindAll(this, [
      'clickedDropBox',
      'filesChosen',
      'handleUrlChange',
      'handleUrlKeyUp',
      'drop'
    ]);
  }

  clickedDropBox(event) {
    this.addInput();
  }

  addInput() {
    // only create a new input if a file was chosen for the last
    const lastInput = last(this.uploadInputsRef.children);
    if(lastInput && lastInput.value === '') {
      this.openFileChooser();
      return;
    }

    const input = <input type="file" multiple="multiple" key={this.state.uploadInputs.length} onChange={this.filesChosen} />;
    this.setState((prevState) => {
      prevState.uploadInputs.push(input);

      return {
        uploadInputs: prevState.uploadInputs
      };
    }, this.openFileChooser);
  }

  openFileChooser() {
    const lastInput = last(this.uploadInputsRef.children);
    lastInput && lastInput.click();
  }

  filesChosen(event) {
    const input = event.target;
    const formData = new FormData();

    for(let i = 0, y = input.files.length; i < y; i++) {
      formData.append(`file${input.key}${i}`, input.files[i]);
    }

    const xhr2 = new XHR2('POST', '/upload/file');
    xhr2.onload = () => {
      this.setState((prevState) => {
        prevState.uploadInputs.splice(input.key, 1);

        return {
          uploading: false,
          uploadInputs: prevState.uploadInputs
        };
      });
    };

    xhr2.send(formData);
    this.setState({ uploading: true });
  }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value
    });
  }

  handleUrlKeyUp(event) {
    if(event.keyCode === 13) {
      const xhr2 = new XHR2('POST', '/upload/url');
      xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr2.onload = () => {
        this.setState({
          url: ''
        });
      };
      xhr2.send(`url=${this.state.url}`);
    }
  }

  static dragEnter(event) {
    event.target.classList.add('dragging');
    event.preventDefault();
  }

  static dragOver(event) {
    event.preventDefault();
  }

  static dragLeave(event) {
    event.target.classList.remove('dragging');
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();

    const dropbox = event.target;
    const files = event.dataTransfer.files;

    // make sure they didnt drop another html element.
    if(files.length > 0) {
      const formData = new FormData();

      for(let i = 0, y = files.length; i < y; i++) {
        formData.append(`drop${i}`, files[i]);
      }

      const xhr2 = new XHR2('POST', '/upload/file');

      xhr2.onload = () => {
        this.setState({
          uploading: false
        });

        if(xhr2.status === 204) {
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
        <div styleName="space" className="alignc">
          <input type="text" styleName="url-upload" value={this.state.url} placeholder="Upload from URL..." onChange={this.handleUrlChange} onKeyUp={this.handleUrlKeyUp} />
        </div>
        <div>
          <div styleName="dropbox" className="no-select" onClick={this.clickedDropBox} onDragEnter={Uploader.dragEnter} onDragOver={Uploader.dragOver} onDragLeave={Uploader.dragLeave} onDrop={this.drop}>
            <div styleName="upload-inputs" ref={ (ele) => {
              this.uploadInputsRef = ele;
            } }>{this.state.uploadInputs}</div>
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
