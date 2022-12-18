//~ Import modules
import client from '../database/connect.js';
import { CoreDataMapper } from './coreDatamapper.js';
class RentalDataMapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'rental';
        this.columns = ` "id","user_id", "vehicle_id", "rent_at", "returned_at"`;
        //Functions
        this.createFunctionName = 'create_rental';
        this.updateFunctionName = 'update_rental';
    }
}
const Rental = new RentalDataMapper(client);
export { Rental };
//# sourceMappingURL=rental.js.map