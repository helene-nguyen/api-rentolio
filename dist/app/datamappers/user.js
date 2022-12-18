//~ Import modules
import pg from 'pg';
import client from '../database/connect.js';
import { CoreDataMapper } from './coreDatamapper.js';
class UserDataMapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'user';
        this.columns = ` "id","name", "password"`;
    }
    //Functions
    // createFunctionName = '';
    // updateFunctionName = '';
    async findByName(name) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `
                        SELECT ${this.columns} 
                        FROM "${this.tableName}"
                        WHERE "name" = $1;
                        `,
                values: [name]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
}
const User = new UserDataMapper(client);
export { User };
//# sourceMappingURL=user.js.map