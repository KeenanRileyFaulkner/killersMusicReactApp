require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS audios;
            
            CREATE TABLE audios (
                album_id SERIAL PRIMARY KEY,
                url VARCHAR(256)
            );
            
            INSERT INTO audios (url)
            VALUES ('SomeURL1'),
            ('SomeURL2'),
            ('SomeURL3'),
            ('AndSoOn');
            `).then(() => {
                console.log('DB seeded!');
                res.sendStatus(200);
            }).catch(err => console.log('Error seeding database.', err));
    }
}