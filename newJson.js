var data = require("./Medicaments.json")
fs=require("fs")


TradeNameMedicaments()
ChemistryNameMedicaments()
testJSON()


function TradeNameMedicaments(){
	var count = 0 
	var newData = {}

	for(var i = 0; i<data.length; i++)
	{
		if(data[i].ChemistryName == '~') continue 
		name = data[i].TradeName
		try{
			newData[name][newData[name].length] = data[i]
		}
		catch(err){
			newData[name] = []
			newData[name][newData[name].length] = data[i]
		}
		count++
	}

	fs.writeFileSync("TradeNameMedicaments.json", JSON.stringify(newData, null, 2))
}

function ChemistryNameMedicaments(){
	var count = 0 
	var newData = {}

	for(var i = 0; i<data.length; i++)
	{
		if(data[i].ChemistryName == '~') continue 
		name = data[i].ChemistryName
		try{
			newData[name][newData[name].length] = data[i]
		}
		catch(err){
			newData[name] = []
			newData[name][newData[name].length] = data[i]
		}
		count++
	}

	fs.writeFileSync("ChemistryNameMedicaments.json", JSON.stringify(newData, null, 2))
}

function testJSON() {

	testJSON = []

	for(var i = 0; i<5; i++)
	{
		if(data[i].ChemistryName == '~') continue
		testJSON[i] = data[i]
		
	}

	fs.writeFileSync("testJSON.json", JSON.stringify(testJSON, null, 2))

}
