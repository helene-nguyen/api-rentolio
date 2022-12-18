//~ Import modules
import client from '../database/connect.js';
import { CoreDataMapper } from './coreDatamapper.js';
class VehicleDataMapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'vehicle';
        this.columns = ` "id","category_id", "brand_id", "reference", "is_booked"`;
        //Functions
        // createFunctionName = '';
        // updateFunctionName = '';
    }
}
const Vehicle = new VehicleDataMapper(client);
export { Vehicle };
//# sourceMappingURL=vehicle.js.map