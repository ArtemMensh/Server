var data = require("./Medicaments.json")
fs=require("fs")


newMedicament()
testJSON()


function newMedicament(){
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

	fs.writeFileSync("newMedicaments.json", JSON.stringify(newData, null, 2))
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
