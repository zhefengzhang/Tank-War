var GameEnum = {
    TankFlag: cc.Enum({
        Player: 0,
        Enemy: 1
    }),
    TileType: cc.Enum({
        tileNone: 0, 
        tileGrass: 1, 
        tileSteel: 2, 
        tileWall: 3,
        tileRiver: 4, 
        tileKing: 5
    }),
    TileGroup: cc.Enum({
        default: 0,
        playerBullet: 1,
        playerTank: 2,
        enemyTank: 3,
        enemyBullet: 4
    })
};

module.exports = GameEnum;