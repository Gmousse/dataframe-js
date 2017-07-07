var DataFrame = require('./lib').DataFrame;
var d3 = require('d3-request');

var DAT = new DataFrame([
    ["FR",4748757],["GB",1932808],["ZA",361107],["ES",218672],["IT",211154],["JP",207653],["DE",207326],["BE",181264],["IN",128172],["US",98530],["RU",90328],["CO",90209],["EU",59256],["NL",22243],["CN",21821],["RE",21166],["CH",18811],["--",17375],["MA",15232],["CA",14885],["VN",14527],["BR",14101],["ID",13045],["TH",11860],["MX",9577],["KH",9002],["MK",8982],["DZ",8474],["TN",8005],["SE",7330],["TR",7027],["A1",6845],["RO",6216],["AL",5938],["PT",5760],["PH",5078],["MQ",4737],["RS",4463],["LU",4416],["CI",4361],["MY",4193],["GP",4071],["BG",3994],["HK",3954],["SG",3705],["PK",3651],["KR",3505],["MG",3262],["AU",3136],["PL",3052],["CM",2882],["IL",2820],["CZ",2712],["GR",2572],["AR",2480],["IE",2390],["UA",2088],["PE",1870],["AT",1853],["MC",1771],["AE",1692],["NC",1691],["EG",1672],["BD",1655],["GF",1641],["CL",1430],["EC",1398],["IR",1389],["DK",1381],["JM",1360],["VE",1336],["LY",1319],["PF",1292],["AP",1247],["TW",1241],["BJ",1231],["TT",1227],["SA",1176],["SN",1069],["LV",1051],["MU",1001],["AZ",971],["HU",959],["NO",875],["YT",866],["AM",761],["DO",737],["FI",736],["EE",692],["LB",666],["BH",608],["JO",587],["PA",549],["BA",536],["KZ",527],["BF",523],["GA",510],["SK",508],["CW",501]
], ["alpha2Code", "nEvents"]);

var alphaURL = "https://restcountries.eu/rest/v2/alpha?codes=" + DAT.toArray("alpha2Code").join(";");

d3.json(alphaURL, function(err, alphaData) {
    var totalNEvents = DAT.stat.sum("nEvents");
    new DataFrame(
            alphaData.filter(function(x) { return x; }),
            ["alpha2Code", "latlng"]
        )
        .join(DAT, 'alpha2Code')
        .show(1000);
    new DataFrame(
            alphaData.filter(function(x) { return x; }),
            ["alpha2Code", "latlng"]
        )
        .withColumn("nEvents", function(row) {
             return DAT.find({alpha2Code: row.get("alpha2Code")}).get("nEvents");
         })
         .show(1000);
})
