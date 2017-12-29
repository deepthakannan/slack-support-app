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
    res.send(this.storage.members[0].members);
  }
}

module.exports = Members;
