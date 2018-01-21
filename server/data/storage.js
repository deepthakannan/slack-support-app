const sql = require('mssql')
 
class Storage {
    constructor() {
        this.config = {
            user: 'drangarajan',
            password: 'Boston09',
            server: 'localhost\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
            database: 'slack-support-app',
         
            options: {
                encrypt: true // Use this if you're on Windows Azure
            }
        };

        sql.on('error', err => {
            // ... error handler
        })
    }

    initialize() {
        if(this.pool) {
            return Promise.resolve(true);
        }
        return sql.connect(this.config).then(pool => {
            this.pool = pool;
            return pool.request()
            .input('OrganizationId', sql.BigInt, 1)
            .query('select TOP 1 * from Team');
        });
    }

    getTeams(organizationId) {
        return this.pool.request()
            .input('OrganizationId', sql.BigInt, organizationId)
            .query('select * from Team where OrganizationId = @OrganizationId'); 
    }

    deleteTeam(organizationId, teamId) {
        return this.pool.request()
            .input('OrganizationId', sql.BigInt, organizationId)
            .input('TeamId', sql.BigInt, teamId)
            .query('delete from Team OUTPUT DELETED.* where OrganizationId = @OrganizationId AND Id = @TeamId'); 
    }

    insertTeam(organizationId, team) {
        return this.pool.request()
            .input('OrganizationId', sql.BigInt, organizationId)
            .input('name', sql.VarChar, team.name)
            .query('insert into Team (Name, OrganizationId) OUTPUT INSERTED.* values (@name, @OrganizationId)'); 
    }

    getMembersFromDb(teamId, organizationId) {
        return sql.connect(this.config).then(pool => {
            return pool.request()
            .input('OrganizationId', sql.BigInt, organizationId)
            .input('Id', sql.BigInt, teamId)
            .query('select * from Team where OrganizationId = @OrganizationId AND Id = @Id');
        }).then(results => {
            return pool.request()
            .input('teamId', sql.BigInt, teamId)
            .query('select * from TeamMember JOIN Member on TeamMember.MemberId = Member.Id where TeamMember.TeamId = @teamId');
        });
    }

    getMembers(teamName) {
        return _.find(data.members, teamMember => teamMember.team == teamName);
      }

    getSchedules(startDate, noOfDays, teamName) {
        let teamMembers = _.find(data.schedules, schedule => schedule.team == teamName);
        return teamMembers.schedules;
      }
}

module.exports = new Storage();