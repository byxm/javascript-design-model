/* 泡泡堂游戏 */

const players = [];// 保存所有玩家

function Player(name,teamColor) {
    this.state = 'live';// 生存状态
    this.name = name;// 角色名字
    this.teamColor = teamColor;// 队伍颜色
}

Player.prototype.win = function() {// 玩家胜利
    console.log(`winner:${this.name}`);
}

Player.prototype.lose = function() {// 玩家团队失败
    console.log(`loser:${this.name}`);
}

//玩家死亡的时候需要遍历玩家所有队友是否还有存活，如果有说明游戏还没有结束，死亡则游戏失败
Player.prototype.die = function() {
    this.state = 'dead';
    playerDirector.ReceiveMessage('playerDead',this);// 给中介者发消息，玩家死亡
}

Player.prototype.remove = function() {
    playerDirector.ReceiveMessage('removePlayer',this);// 给中介者发消息，移除一个玩家
}

// 玩家换队
Player.prototype.changeTeam = function(color) {
    playerDirector.ReceiveMessage('changeTeam',this,color);// 给中介者发送消息，玩家换队
}

//创建玩家的工厂
const playerFactory = function(name,teamColor) {
    const newPlayer = new Player(name,teamColor);// 创建新玩家
    playerDirector.ReceiveMessage('addPlayer',newPlayer);// 给中介者发消息，新增玩家
    return newPlayer;
}

const playerDirector = (function(){
    const players = {};// 保存所有玩家
    const operations = {};// 中介者可以执行的操作
    //新增一个玩家
    operations.addPlayer = function(player) {
        const teamColor = player.teamColor; //玩家队伍的颜色
        players[teamColor] = players[teamColor] || [];// 如果该颜色玩家没有成立队伍，则成立一个新队伍
        players[teamColor].push(player);// 添加玩家进队伍
    }

    //移除一个玩家
    operations.removePlayer = function(player) {
        const teamColor = player.teamColor;// 玩家的队伍颜色
        const teamPlayers = players[teamColor] || [];// 该队伍所有成员
        for(let i = teamPlayers.length - 1;i >= 0;i--) {// 遍历删除
            if (teamPlayers[i] === player) {
                teamPlayers.splice(i,1);
            }
        }
    }

    //玩家换队伍
    operations.changeTeam = function(player,newTeamColor) {// 玩家换队
        operations.removePlayer(player);// 从原队伍中删除
        player.teamColor = newTeamColor;// 改变队伍颜色
        operations.addPlayer(player);// 增加到新队伍中
    }

    operations.playerDead = function(player) {// 玩家死亡
        const teamColor = player.teamColor;
        const teamPlayers = players[teamColor];// 玩家所在队伍
        let all_dead = true;
        for(let i = 0,player;player = teamPlayers[i++];) {
            if (player.state !== 'dead') {
                all_dead = false;
                break;
            }
        }
        if (all_dead === true) {// 全部死亡
            for(let i = 0,player;player = teamPlayers[i++];) {
                player.lose();// 本队所有玩家lose
            }
            for(const color in players) {
                if(color !== teamColor) {
                    const teamPlayers = players[color];//其他队伍玩家
                    for(let i = 0,player;player = teamPlayers[i++];) {
                        player.win();// 其他队伍所有玩家win
                    }
                }
            }
        }   
    }

    const ReceiveMessage = function() {
        const message = Array.prototype.shift.call(arguments);// arguments的第一个参数消息名称
        operations[message].apply(this,arguments);
    }
    return {
        ReceiveMessage
    }

})()

//红队
const player1 = playerFactory('皮蛋','red');
const player2 = playerFactory('小乖','red');
const player3 = playerFactory('宝宝','red');
const player4 = playerFactory('强强','red');

//蓝队
const player5 = playerFactory('黑妞','blue');
const player6 = playerFactory('葱头','blue');
const player7 = playerFactory('胖墩','blue');
const player8 = playerFactory('海盗','blue');

//红队玩家全部死亡
// player1.die();
// player2.die();
// player3.die();
// player4.die();

//假设皮蛋和小乖掉线
// player1.remove();
// player2.remove();
// player3.die();
// player4.die();

// 假设皮蛋从红队叛变到蓝队
player1.changeTeam('blue');
player2.die();
player3.die();
player4.die();
