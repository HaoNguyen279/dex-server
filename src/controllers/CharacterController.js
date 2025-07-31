const genshindb = require("genshin-db");

class CharacterController{
    async index(req, res, next){
        const data = req.query;
        console.log(data.name);
        const result = genshindb.characters(data.name, {resultLanguage:"vi"});
        if(!result){
            res.send('Error 404 Not found character!');
            return;
        }
        console.log(result);
        res.json(result);
    }
}

module.exports = new CharacterController;