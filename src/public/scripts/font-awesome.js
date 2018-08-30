import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDna, faSpinner, faPhone, faEnvelope, faMapMarkerAlt,
  faStar, faInfoCircle, faCircle, faCaretLeft, faCloudUploadAlt,
  faArrowLeft, faWifi, faTimes, faEdit
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function() {
  library.add(
    faLinkedin,
    faGithub,
    faDna,
    faSpinner,
    faPhone,
    faEnvelope,
    faMapMarkerAlt,
    faStar,
    faInfoCircle,
    faCircle,
    faCaretLeft,
    faCloudUploadAlt,
    faArrowLeft,
    faWifi,
    faTimes,
    faEdit
  );
}
