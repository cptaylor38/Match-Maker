var friendData = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends/", function (req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function (req, res) {
        var user = req.body;
        var userScore = user.scores;
        var userTotal = 0;
        var match;
        var potentialMatches = [];

        for (var i = 0; i < userScore.length; i++) {
            userTotal += parseInt(userScore[i]);
        }

        friendData.forEach((element) => {
            var totalScore = 0;
            var newElement;
            for (var i = 0; i < element.scores.length; i++) {
                totalScore += parseInt(element.scores[i]);
            }
            newElement = element;
            newElement.totalDifference = Math.abs(userTotal - totalScore);
            potentialMatches.push(newElement);
        });

        var currentMatch;
        for (var i = 0; i < potentialMatches.length; i++) {
            currentMatch = potentialMatches[i];
            if (potentialMatches[i].totalDifference > currentMatch.totalDifference) {
                currentMatch = element;
            }
            match = currentMatch;
        }

        friendData.push(user);
        if (match) {
            res.json(match);
        }
        else {
            res.json(false);
        }


    });
};


