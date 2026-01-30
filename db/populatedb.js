const {Client} = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100),
        member BOOLEAN DEFAULT FALSE,
        admin BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(100),
        message TEXT,
        added DATE,
        authorId INTEGER REFERENCES users(id)
    );
`;

async function main(){
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");    
}

main();

