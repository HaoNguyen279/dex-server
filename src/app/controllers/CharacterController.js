const genshindb = require("../../../genshin-db-js-bundle/genshindb");
const quiz = require("../../resources/data/quizQuestions.json");

class CharacterController{
    checkApiKey(req, res, next) {
        const apiKey = req.headers['x-api-key'];
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress;
        console.log(ip);
        console.log(`IP Client request: ${ip}, API Key: ${apiKey}`);
        if (!apiKey || apiKey !== '') {
            return res.status(403).json({ error: 'Forbidden: Invalid or missing API key, đéo có key vô vô cc' });
        }
        console.log("API Key is valid");
        next();
    }

    // [GET] Get character name
    async getCharacterByName(req, res, next){
        const data = req.query;
        console.log(data.name);
        const result = genshindb.characters(data.name, {resultLanguage:data.lang});
        if(data.name !== result.name){
            res.send('Error 404 Not found character!');
            return;
        }
        if(!result){
            res.send('Error 404 Not found character!');
            return;
        }
        res.json(result);
    }

    // [GET] Get character voice info by name 
    async getCharInfoByName(req, res, next){
        const data = req.query;
        console.log(data.name);
        const voice = genshindb.voiceovers(data.name, {resultLanguage:data.lang});
        const statsBase = genshindb.characters(data.name).stats(1);
        const statsMax = genshindb.characters(data.name).stats(90);
        const typeSubstatText = genshindb.characters(data.name).substatText;
        const version = genshindb.characters(data.name).version;
        if(!voice || !statsBase || !statsMax || !typeSubstatText || !version){
            res.send('Error 404 not found!');
            return;
        }
        res.json({voice, statsBase, statsMax, typeSubstatText, version});
    }

    // [GET] Get quiz questions
    async getQuizQuestions(req, res, next){
        // const data = req.query;
        // console.log(data.name);
        // const quiz = genshindb.characters(data.name).quiz;
        // if(!quiz){
        //     res.send('Error 404 not found!');
        //     return;
        // }
        res.json(quiz);
    }

}

module.exports = new CharacterController;