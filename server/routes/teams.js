var _ = require("lodash");
class Teams {
  constructor(storage) {
    this.storage = storage;
    this.ezesoftOrgId = 1;
  }

  initializeRoutes(express) {
    let router = express.Router();
    router.get('/', (req, res, next) => this.getTeams(req, res, next));
    router.delete('/:orgId/:teamId', (req, res, next) => this.deleteTeam(req, res, next));
    router.post('/:orgId', (req, res, next) => this.createNewTeam(req, res, next));
    return router;
  }

  getTeams(req, res, next){
    this.storage.getTeams(this.ezesoftOrgId).then(result => {
      let teams = [];
      _.forEach(result.recordset, function(item) {
        teams.push({
          name: item.Name,
          id: item.Id,
          orgId: item.OrganizationId
        });
      });
      res.send(teams);
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  deleteTeam(req, res, next){
    this.storage.deleteTeam(req.params.orgId, req.params.teamId).then(result => {
      if(result.recordset.length == 1) {
        res.send({
          name: result.recordset[0].Name,
          id: result.recordset[0].Id,
          orgId: result.recordset[0].OrganizationId
        });
      } else {
        res.status(400).send();
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  }

  createNewTeam(req, res, next){
    let newTeam = {name: req.body.name};
    this.storage.insertTeam(req.params.orgId, newTeam).then(result => {
      if(result.recordset.length == 1) {
        res.send({
          name: result.recordset[0].Name,
          id: result.recordset[0].Id,
          orgId: result.recordset[0].OrganizationId
        });
      } else {
        res.send(result);
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  }
}

module.exports = Teams;
