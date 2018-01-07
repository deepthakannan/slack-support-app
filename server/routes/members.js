var _ = require("lodash");
class Members {
  constructor(storage) {
    this.storage = storage;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/:teamName', (req, res, next) => this.getMembers(req, res, next));
    return router;
  }

  getMembers(req, res, next) {
    let teamMembers = this.storage.getMembers(req.params.teamName)
    if(teamMembers) {
      res.send(teamMembers.members);
    } else  {
      res.send([]);
    }
    
  }
}

module.exports = Members;
