
var GameEnum = require("./GameEnum");
var GameConst = {
	GidToTileType:[
		GameEnum.TileType.tileNone,
		
		GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileGrass, GameEnum.TileType.tileGrass, GameEnum.TileType.tileSteel, GameEnum.TileType.tileSteel, 
		GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileGrass, GameEnum.TileType.tileGrass, GameEnum.TileType.tileSteel, GameEnum.TileType.tileSteel,
	
		GameEnum.TileType.tileWall, GameEnum.TileType.tileWall, GameEnum.TileType.tileRiver, GameEnum.TileType.tileRiver, GameEnum.TileType.tileKing, GameEnum.TileType.tileKing,
		GameEnum.TileType.tileWall, GameEnum.TileType.tileWall, GameEnum.TileType.tileRiver, GameEnum.TileType.tileRiver, GameEnum.TileType.tileKing, GameEnum.TileType.tileKing,
	
		GameEnum.TileType.tileKing, GameEnum.TileType.tileKing, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone,
		GameEnum.TileType.tileKing, GameEnum.TileType.tileKing, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone, GameEnum.TileType.tileNone
	],
	Dirction: ["up","left","down","right"],
	DirctionRex: [/up/,/left/,/down/,/right/],
	EnemyTankTypes: [
		{
			name: "armor",
			score: 500,
			speed: 0.4
		},
		{
			name: "fast",
			score: 250,
			speed: 0.2
		},
		{
			name: "normal",
			score: 100,
			speed: 0.4
		}
	],
	armorTankNum: 4,
	fastTankNum: 3,
	normalTankNum: 2,
	PlayerTankReviveTimes: 5,
	EnemyTankAmount: 5
};
module.exports = GameConst;