class Teams {
  constructor(storage) {
    this.storage = storage;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/', (req, res, next) => this.getTeams(req, res, next));
    router.post('/', (req, res, next) => this.createNewTeam(req, res, next));
    return router;
  }

  getTeams(req, res, next){
    res.send(this.storage.getTeams());
  }

  createNewTeam(req, res, next){
    let newTeam = {name: req.body.name};
    this.storage.teams.push(newTeam);
    res.send(newTeam);
  }
}

module.exports = Teams;
