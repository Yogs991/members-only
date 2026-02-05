const pool = require("./pool");


async function createUser(firstName, lastName, username, email, password){
    const {rows} = await pool.query(
        "INSERT INTO users (firstName, lastName, username, email, password) VALUES ($1, $2, $3, $4, $5)",
        [firstName, lastName, username, email, password]
    );
    return rows;
}

async function getUserById(id){
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE id=$1",[id]
    );
    return rows;
}

async function getUserByUserName(username){
    const {rows} = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
    return rows[0];
}

async function getAllMessages(){
    const {rows} = await pool.query("SELECT * FROM messages");
    return rows;
}

async function createMessage(title, description, userId){
    const {rows} = await pool.query(
       "INSERT INTO messages (title, description, added, authorId) VALUES($1, $2, NOW(), $3)",
        [title, description, userId]
    );
    return rows;
}

async function updateMemberStatus(id){
    const {rows} = await pool.query(
        "UPDATE users SET member= true WHERE id = $1",[id]
    );
    return rows
}

async function updateAdminStatus(id){
    const {rows} = await pool.query(
        "UPDATE users SET admin = true WHERE id=$1",[id]
    );
    return rows
}

module.exports= {
    createUser,
    getUserById,
    getUserByUserName,
    getAllMessages,
    createMessage,
    updateMemberStatus,
    updateAdminStatus
}