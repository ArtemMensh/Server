var data = require("./Medicaments.json")
fs=require("fs")


var newData = {}

for(var i = 0; i<data.length; i++)
{
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

fs.writeFileSync("newMedicaments.json", JSON.stringify(newData))
