fs = require('fs')

function readFormula(fileName) {
  var file = fs.readFileSync("sat/" + fileName, 'ascii')
  var text = file.split("\n")

  for (var i=0; i < file.lenght(); i++){
    var variables [i] =
    var clauses [i] =
  }

}

readFormula('hole1.cnf')
