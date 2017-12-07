fs = require('fs');

var variablesP;
var clausesP;
var variables;
var clauses = [];
var clause = [];
var fixe = 0;
var currentPosition = 0;

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

        row = row.replace(/\s+/g, " ");

        //pegar numeros
        clause = clause.concat(row.split(" "));

        clause = clause.filter(function(elem, index, self){
          return elem != '';
        });

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

    return "Erro: Conjunto de cláusulas difere da definição do problema.";
  }

}

function nextAssignment(variables) {

  if(fixe < variables.length){
    
    for(var i=0; i < fixe; i++){
      variables[i] = 1;
    }

    for(var j=fixe; j < variables.length; j++){
      if((j!= currentPosition) || (j == currentPosition && currentPosition == fixe)){
        variables[j] = 0;
      }else{
        variables[j] = 1;
      }
    }

    if(currentPosition == variables.length - 1){
      ++fixe;
      currentPosition = fixe;
    } else {
      ++currentPosition;
    }

    return variables;
  
  }else if(fixe == variables.length){

    for(var i=0; i < variables.length; i++){
      variables[i] = 1;
    }
    ++fixe;

    return variables;

  }else{
    return -1;
  }
}

function doSolve(clauses, variables){

  do{
    
    var assignmentValoration = true;
    
    for(var clause of clauses){
      var clauseValoration = false;
      for(var variable of clause){
        if(parseInt(variable) < 0){
          index = Math.abs(parseInt(variable-1));
          variable = !variables[index]; 
        }else{
          index = parseInt(variable-1);
          variable = variables[index]; 
        }

        if(variable == true){
          clauseValoration = true;
          break;
        }
      } 

      if(clauseValoration == false){
        assignmentValoration = false;
        break;
      }
    }

    if(assignmentValoration){
      return {'isSat': false, 'satisfyingAssignment': variables};
    }

    variables = nextAssignment(variables);

  }while(variables != -1);
  
  return {'isSat': true, 'satisfyingAssignment': null};
  
}

function solve(file){

  var expression = readFormula(file);

  return doSolve(expression.clauses, expression.variables);
}

console.log(solve('hole6.cnf'));