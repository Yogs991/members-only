const {Client} = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        email VARCHAR(100),
        username VARCHAR(100),
        password VARCHAR(100),
        member BOOLEAN DEFAULT FALSE,
        admin BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(100),
        description TEXT,
        added DATE,
        authorId INTEGER REFERENCES users(id)
    );

    INSERT INTO messages(title, description, added, authorid) VALUES ($1,$2,$3,$4)
        ('My first message'),
        ('hello everyone, this is my first message here.'),
        (NOW()),
        (1);
    
    INSERT INTO messages(title, description, added, authorid) VALUES ($1,$2,$3,$4)
    ('My second message'),
        ('good morning everyone, how was your day?.'),
        (NOW()),
        (1);
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

