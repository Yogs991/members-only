const pool = require("./pool");


async function createUser(firstName, lastName, email, password){
    const {rows} = await pool.query(
        "INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, password]
    );
    return rows;
}

async function getUserById(id){
    const {rows} = await pool.query(
        "SELECT * FROM user WHERE id=$1",[id]
    );
    return rows;
}

async function getUserByUserName(email){
    const {rows} = await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    return rows;
}

async function getAllMessages(){
    const {rows} = await pool.query("SELECT * FROM messages");
    return rows;
}

async function createMessage(title, message, userId){
    const {rows} = await pool.query(
       "INSERT INTO messages (title, message, added, authorId) VALUES($1, $2, NOW(), $3)",
        [title, message, userId]
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