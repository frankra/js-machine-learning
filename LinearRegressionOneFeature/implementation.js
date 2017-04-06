(function () {
  "use strict";

  function LinearRegressionOneFeature() { }

  LinearRegressionOneFeature.prototype.aTrainingSet = [];
  //Used to store the Squared Error Results
  LinearRegressionOneFeature.prototype.aSquaredErrorResults = [];

  LinearRegressionOneFeature.prototype.aHipothesisSet = [];

  function calculateRandomBetweenIncreasing(min, max, i) {
    max = max + i;
    min = min + i;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  LinearRegressionOneFeature.prototype.generateRandomTrainingSet = function (iSetSize) {
    this.aTrainingSet = [];

    iSetSize = iSetSize || 50;
    var min = 1;
    var max = 100;

    for (var i = 0; i < iSetSize; i++) {
      this.aTrainingSet.push({
        x: i,
        y: calculateRandomBetweenIncreasing(min, max, i)
      });
    }
    return this.aTrainingSet;
  }

  LinearRegressionOneFeature.prototype.growTrainingSet = function (iIncreaseFactor) {
    
    iIncreaseFactor = iIncreaseFactor || 30;
    var min = 1;
    var max = 100;

    var _length = this.aTrainingSet.length;
    for (var i = 0; i < iIncreaseFactor; i++) {
      this.aTrainingSet.push({
        x: _length + i,
        y: calculateRandomBetweenIncreasing(min, max, _length + i)
      });
    }
    return this.aTrainingSet;
  }


  //hϴ(x) = 0 + ϴ1 * x 
  LinearRegressionOneFeature.prototype.hipotesis = function (x, vTetha1) {
    return vTetha1 * x
  }

  LinearRegressionOneFeature.prototype.squaredError = function (vPossibleTetha1) {
    var vLinearRegressionResult = 0;
    for (var i = 0, ii = this.aTrainingSet.length; i < ii; i++) {
      vLinearRegressionResult += Math.pow(this.hipotesis(this.aTrainingSet[i].x, vPossibleTetha1) - this.aTrainingSet[i].y, 2);
    }
    return (1 / (2 * this.aTrainingSet.length)) * vLinearRegressionResult;
  }

  LinearRegressionOneFeature.prototype.calculateHipothesisSet = function (iCalculatedThetha) {
    this.aHipothesisSet = [];
    for (var i = 0, ii = this.aTrainingSet.length; i < ii; i++) {
      this.aHipothesisSet.push({
        x: i,
        y: this.hipotesis(i, iCalculatedThetha)
      });
    }
    return this.aHipothesisSet;
  }

  LinearRegressionOneFeature.prototype.findLowestSquaredErrorResult = function (vCurrentSquaredErrorResult, vTethaTest, vVarianceFactor) {
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


