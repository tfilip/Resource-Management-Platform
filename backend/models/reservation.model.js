module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        canceled: {
            type: Sequelize.BOOLEAN
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Reservation;
};