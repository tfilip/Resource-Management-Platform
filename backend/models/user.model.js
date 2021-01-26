module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        organisation_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'organisations',
                key: 'id'
            }
        },
        role_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        }
    });
    return User;
};