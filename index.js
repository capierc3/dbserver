const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());

app.get('/', function (req,res) {
    res.header("Content-Type",'application/json');
    res.sendFile(path.join(__dirname, 'db.json'));
})

app.put('/', function (req, res) {
    //get json
    let dbRaw = fs.readFileSync('db.json');
    let db = JSON.parse(dbRaw);
    let changed;
    let newMessage;
    switch (req.body.type) {
        case "names":
            db.names.push(req.body.data);
            changed = true;
            break;
        case "locs":
            db.locs.push(req.body.data);
            changed = true;
            break;
        case "desc":
            switch (req.body.data.type) {
                case "battle":
                    db.desc.battle.push(req.body.data.desc);
                    break;
                case "search":
                    db.desc.search.push(req.body.data.desc);
                    break;
                case "discovery":
                    db.desc.discovery.push(req.body.data.desc);
                    break;
            }
            changed = true;
            break;
        case "fav":
            db.favs.push(req.body.data)
            changed = true;
            break;
        case "user":
            db.users.push(req.body.data)
            changed = true;
            break;
        case "msg":
            newMessage = true;
            break
        default:
            changed = false;
            newMessage = false;
    }
    if (changed) {
        let data = JSON.stringify(db, null, 2)
        fs.writeFileSync('db.json', data);
        res.sendStatus(200)
    } else if (newMessage) {
        let msgRaw = fs.readFileSync('messages.json');
        let msg = JSON.parse(msgRaw);
        msg.push(req.body.data);
        let msgString = JSON.stringify(msg, null, 2)
        fs.writeFileSync('messages.json', msgString);
        res.sendStatus(200)
    } else {
        console.log(req.body);
        res.sendStatus(202)
    }
})

app.listen(3000);