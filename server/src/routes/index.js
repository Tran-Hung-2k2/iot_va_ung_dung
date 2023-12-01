import auth_route from './auth.route.js';
import parking_route from './parking.route.js';
import parking_card_route from './parking_card.route.js';
import parking_manager_route from './parking_manager.route.js';
import parking_record_route from './parking_record.route.js';

export default (app) => {
    app.use('/api/auth', auth_route);
    app.use('/api/parking', parking_route);
    app.use('/api/parking_card', parking_card_route);
    app.use('/api/parking_manager', parking_manager_route);
    app.use('/api/parking_record', parking_record_route);
};
