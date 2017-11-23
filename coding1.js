fs = require('fs')
var variablesP;
var clausesP;

function readFormula(fileName) {
  var file = fs.readFileSync("sat/" + fileName, 'ascii');
  var text = file.split("\n");

  for (ss in text){
    if(ss[0] != 'c'){
      for(var j=0; j < ss.lenght; j++ ){
        if(ss[0] == "p"){
          //pegar paramentros v e c
           var tt = ss.split(" ");
            variablesP = ParseInt(tt[tt.lenght -2]);
            clausesP = ParseInt(tt[tt.lenght -1]);
        }else[
          //
        numbers.push(ss);
        ]
      }
    }
     [i] =
    var clauses [i] =
  }

}

readFormula('hole1.cnf')
