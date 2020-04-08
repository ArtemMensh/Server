const generics = require("../ChemistryNameMedicaments.json")
fs=require("fs")

newData = {}

var i = 0
for(key in generics)
{
	data = []
	for(element in generics[key])
	{
		if(!data.includes(generics[key][element].TradeName)) data[data.length] = generics[key][element].TradeName
	}
	newData[key] = data
	if(i>10) break
	i++
}

fs.writeFileSync("TradeNameForGeneric.json", JSON.stringify(newData, null, 2))