import React, { useState, useEffect, useRef } from 'react';
import { last } from 'lodash-es';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { httpError } from '../../scripts/errors';

import './index.scss';

export default function Uploader(props) {
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadInputs, setUploadInputs] = useState([]);

  const uploadInputsRef = useRef(null);

  useEffect(() => {
    addInput();
  }, []);

  function clickedDropBox(event) {
    openFileChooser();
  }

  function addInput() {
    const lastInput = last(uploadInputsRef.current.children);

    if(!lastInput || lastInput.value !== '') {
      const input = <input type="file" multiple="multiple" key={ uploadInputs.length } onChange={ filesChosen } />;
      setUploadInputs([...uploadInputs, input]);
    }
  }

  function openFileChooser() {
    const lastInput = last(uploadInputsRef.current.children);
    !uploading && lastInput && lastInput.click();
  }

  function filesChosen(event) {
    const input = event.target;
    const formData = new FormData();

    for(let i = 0, y = input.files.length; i < y; i++) {
      formData.append(`file${input.key}${i}`, input.files[i]);
    }

    axios.post('/upload/file', formData)
      .then((response) => {
        const removedUploaded = uploadInputs.splice(input.key, 1);
        setUploadInputs(removedUploaded);
        setUploading(false);
        addInput();
      }).catch(httpError((error) => {
        alert('Error uploading file(s)'); // eslint-disable-line no-alert
      }));

    setUploading(true);
  }

  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  function handleUrlKeyUp(event) {
    if(event.keyCode === 13) {
      axios.post('/upload/url', {
        url
      }).then((response) => {
        setUrl('');
      }).catch(httpError((error) => {
        alert('Error getting that file'); // eslint-disable-line no-alert
      }));
    }
  }

  function dragEnter(event) {
    event.target.classList.add('dragging');
    event.preventDefault();
  }

  function dragOver(event) {
    event.preventDefault();
  }

  function dragLeave(event) {
    event.target.classList.remove('dragging');
    event.preventDefault();
  }

  function drop(event) {
    event.preventDefault();

    const dropbox = event.target;
    const files = event.dataTransfer.files;

    // make sure they didnt drop another html element.
    if(files.length > 0) {
      const formData = new FormData();

      for(let i = 0, y = files.length; i < y; i++) {
        formData.append(`drop${i}`, files[i]);
      }

      axios.post('/upload/file', formData)
        .then((response) => {
          setUploading(false);

          if(response.status === 204) {
            dropbox.classList.remove('dragging');
          }
        }).catch(httpError((error) => {
          alert('Error uploading file(s)'); // eslint-disable-line no-alert
        }));

      setUploading(true);
    }
  }

  return (
    <main>
      <div styleName="space" className="alignc">
        <input type="text" styleName="url-upload" value={ url } placeholder="Upload from URL..." onChange={ handleUrlChange } onKeyUp={ handleUrlKeyUp } />
      </div>
      <div>
        <div styleName="dropbox" className="no-select" onClick={ clickedDropBox } onDragEnter={ dragEnter } onDragOver={ dragOver } onDragLeave={ dragLeave } onDrop={ drop }>
          <div styleName="upload-inputs" ref={ uploadInputsRef }>{ uploadInputs }</div>
          {uploading &&
            <div>
              <FontAwesomeIcon icon="spinner" size="4x" pulse fixedWidth />
              <div className="bold">Uploading...</div>
            </div>
          }
          {!uploading &&
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
