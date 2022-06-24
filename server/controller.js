require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    getSong: (req, res) => {
        const { id } = req.params;
        sequelize.query(`
            SELECT url FROM audios
            WHERE ${id} = album_id`)
        .then(dbRes => {
            // res.status(200).send(dbRes[0][0].url)
            console.log(dbRes[0]);
        })
            .catch(err => console.log(err));
    }
}