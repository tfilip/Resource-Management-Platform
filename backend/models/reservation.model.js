module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        canceled: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        description: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        resource_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'resources',
                key: 'id'
            }
        }
    });
    return Reservation;
};