"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRole = void 0;
var _userModel = _interopRequireDefault(require("../model/userModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const userRole = async (req, res) => {
  try {
    const roles = await _userModel.default.findById(req.params.id);
    if (!roles) {
      return res.role(404).json({
        message: ' request not found'
      });
    }
    if (req.body.role === 'leader') {
      roles.role = req.body.role;
      await roles.save();
      res.json({
        message: 'your usertype updated successfully'
      });
    } else if (req.body.role === 'admin') {
      roles.role = req.body.role;
      await roles.save();
      res.json({
        message: 'Now you are an Admin'
      });
    } else if (req.body.role === 'user') {
      roles.role = req.body.role;
      await roles.save();
      res.json({
        message: 'still a normal user'
      });
    } else {
      res.status(400).json({
        message: 'Invalid  request role'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update  request'
    });
  }
};
exports.userRole = userRole;
//# sourceMappingURL=changeRole.js.map