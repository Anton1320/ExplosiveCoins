var leaderboard = document.getElementById("leaderboard");
leaderboard.width = sc.clientWidth/3
leaderboard.height = sc.clientHeight/2;
var lbctx = leaderboard.getContext("2d");

var a = new Item([100, 100], [100, 100], "black", "smth");

a.draw(lbctx);
console.log("lb is ok!");