const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

module.exports = () => {
  Enzyme.configure({ adapter: new EnzymeAdapter() });
};
