(function () {
  "use strict";

  function LinearRegressionOneFeature(){}

  LinearRegressionOneFeature.prototype.aTrainingSet = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 }
  ]
  function calculateRandomBetweenIncreasing(min, max, i) {
    max = max + i;
    min = min + i;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  LinearRegressionOneFeature.prototype.generateRandomTrainingSet = function(iSetSize){
    this.aTrainingSet = [];

    iSetSize = iSetSize || 50;
    var min = 1;
    var max = 10;

    for (var i = 0; i < iSetSize; i++){
      this.aTrainingSet.push({
        x: i+ 1,
        y: calculateRandomBetweenIncreasing(min, max, i)
      });
    }
    return this.aTrainingSet;
  }

  //Used to store the Squared Error Results
  LinearRegressionOneFeature.prototype.aSquaredErrorResults = [];

  /*
  4       x
  3     x
  2   x
  1 x 
  0 1 2 3 4
  */

  //hϴ(x) = 0 + ϴ1 * x 
  LinearRegressionOneFeature.prototype.hipotesis = function(x, vTetha1) {
    return vTetha1 * x
  }

  LinearRegressionOneFeature.prototype.squaredError = function(vPossibleTetha1) {
    var vLinearRegressionResult = 0;
    for (var i = 0, ii = this.aTrainingSet.length; i < ii; i++) {
      vLinearRegressionResult += Math.pow(this.hipotesis(this.aTrainingSet[i].x, vPossibleTetha1) - this.aTrainingSet[i].y, 2);
    }
    return (1 / (2 * this.aTrainingSet.length)) * vLinearRegressionResult;
  }

  LinearRegressionOneFeature.prototype.findLowestSquaredErrorResult = function(vCurrentSquaredErrorResult, vTethaTest, vVarianceFactor) {
    var vIncreasedTetha = vTethaTest + vVarianceFactor;
    var vDecreasedTetha = vTethaTest - vVarianceFactor;
    var vIncreasingTethaSQEResult = this.squaredError(vIncreasedTetha);
    var vDecreasingTethaSQEResult = this.squaredError(vDecreasedTetha);
    //Return on Zero
    if (vIncreasingTethaSQEResult === 0) {
      this.aSquaredErrorResults.push({
        tetha: vIncreasedTetha,
        sqrdErr: vIncreasingTethaSQEResult
      });
      return vIncreasedTetha;
    } else if (vDecreasingTethaSQEResult === 0) {
      this.aSquaredErrorResults.push({
        tetha: vDecreasedTetha,
        sqrdErr: vDecreasingTethaSQEResult
      });
      return vDecreasedTetha;
    }

    if (vIncreasingTethaSQEResult < vCurrentSquaredErrorResult) {
      this.aSquaredErrorResults.push({
        tetha: vIncreasedTetha,
        sqrdErr: vIncreasingTethaSQEResult
      });
      return this.findLowestSquaredErrorResult(vIncreasingTethaSQEResult, vIncreasedTetha, vVarianceFactor); //Route to Increase
    } else if (vDecreasingTethaSQEResult < vCurrentSquaredErrorResult) {
      this.aSquaredErrorResults.push({
        tetha: vDecreasedTetha,
        sqrdErr: vDecreasingTethaSQEResult
      });
      return this.findLowestSquaredErrorResult(vDecreasingTethaSQEResult, vDecreasedTetha, vVarianceFactor); //Route to Decrease
    } else if (vVarianceFactor === 0) {
      this.aSquaredErrorResults.push({
        tetha: vIncreasedTetha,
        sqrdErr: vDecreasingTethaSQEResult
      });
      return vIncreasedTetha;
    } else {
      return this.findLowestSquaredErrorResult(vIncreasingTethaSQEResult, vTethaTest, vVarianceFactor / 2); //Reduce Variance and try again
    }
  }

  window.top.LinearRegressionOneFeature = new LinearRegressionOneFeature();

})();


