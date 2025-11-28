var QuestionPaper = artifacts.require("./QuestionPaperSystem.sol");

module.exports = function (deployer) {
  deployer.deploy(QuestionPaper);
};