const Game=require('../models/gamesModel')

exports.gameHistory = async(req,res)=> {
    try {
        const game = await Game.find({user: req.user.id});
        res.send(game);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error in fetching history",error)
    }
}

exports.createGame = async(req,res)=>{
    try {
        const { gameLevel, numOfMoves } = req.body;
        const data = new Game({gameLevel, numOfMoves, user:req.user.id})
        const response = await data.save();
        res.status(200).json({
            message:"Game Created Successfully",
            gameLevel:response.gameLevel,
            numOfMoves:response.numOfMoves
    }) 
    } catch (error) {
        console.log(error)
        res.status(500).send("Error in creating Game",error)
    }
}