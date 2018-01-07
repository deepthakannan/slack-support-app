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

    getTeams() {
        return this.pool.request()
            .input('OrganizationId', sql.BigInt, 1)
            .query('select * from Team where OrganizationId = @OrganizationId'); 
    }

    getMembers(teamId) {
        return sql.connect(this.config).then(pool => {
            return pool.request()
            .input('OrganizationId', sql.BigInt, 1)
            .input('Id', sql.BigInt, teamId)
            .query('select * from Team where OrganizationId = @OrganizationId AND Id = @Id');
        }).then(results => {
            return pool.request()
            .input('teamId', sql.BigInt, teamId)
            .query('select * from TeamMember JOIN Member on TeamMember.MemberId = Member.Id where TeamMember.TeamId = @teamId');
        });
    }
}

module.exports = new Storage();