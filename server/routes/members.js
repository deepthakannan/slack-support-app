var _ = require("lodash");
class Members {
  constructor(storage) {
    this.storage = storage;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/', (req, res, next) => this.getMembers(req, res, next));
    return router;
  }

  getMembers(req, res, next) {
    let teamMembers = _.find(this.storage.members, teamMember => teamMember.team == req.query.teamName);
    if(teamMembers) {
      res.send(teamMembers.members);
    } else  {
      res.send([]);
    }
    
  }
}

module.exports = Members;
