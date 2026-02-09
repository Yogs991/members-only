function requireMember(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({msg:"You are not a member to view this resource"});
    }
}

function requireAdmin(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(401).json({msg:"You are not an admin to view this resource"});
    }
}

module.exports = {
    requireMember,
    requireAdmin
}