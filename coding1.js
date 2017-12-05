fs = require('fs');

var variablesP;
var clausesP;
var variables;
var clauses = [];
var clause = [];

function checkProblemSpecification(){


  var merged = [].concat.apply([], clauses).map(Number).map(Math.abs);

  var unique = merged.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  });

  return (variablesP === unique.length && clausesP === clauses.length);
}

function readFormula(filename) {

  var file = fs.readFileSync("sat/" + filename, 'ascii');
  var cnf_rows = file.split("\n");

  for (row of cnf_rows){
    if(row[0] != 'c'){
      if(row[0] == "p"){
        //pegar paramentros v e c
          var problem;
          problem = row.split(" ");
          variablesP = parseInt(problem[problem.length-2]);
          variables = new Array(variablesP);
          variables = variables.fill(0);
          clausesP = parseInt(problem[problem.length-1]);
      }else{
        //pegar numeros
        clause = clause.concat(row.split(" "));
 
        if(clause[clause.length - 1] == "0"){
          clause = clause.slice(0, clause.length - 1);
          clauses.push(clause);
          clause = [];
        }
      }
    }
  }

  if(checkProblemSpecification()){;

    var object = {
      "clauses": clauses,
      "variables": variables
    }

    return object;

  }else{

    return "Erro: Conjunto de cláusulas difere da definição do problema."
  }

}

console.log(readFormula('hole1.cnf'));