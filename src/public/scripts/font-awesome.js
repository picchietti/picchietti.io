import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDna, faSpinner, faPhone, faEnvelope, faMapMarkerAlt,
  faStar, faInfoCircle, faCircle, faCaretLeft, faCloudUploadAlt,
  faArrowLeft, faWifi, faTimes, faEdit
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub, faLinkedin, faGitlab
} from '@fortawesome/free-brands-svg-icons';

export default function() {
  library.add(
    faLinkedin,
    faGithub,
    faGitlab,
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
