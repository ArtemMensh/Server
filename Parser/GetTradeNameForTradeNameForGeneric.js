const data = require("./TradeNameForGeneric.json")
fs=require("fs")

newData = {}

for(key in data)
{
	for(item in data[key])
	{
		newData[data[key][item]] = {}
	}
}

fs.writeFileSync("TradeNameForTestParsing.json", JSON.stringify(newData, null, 2))