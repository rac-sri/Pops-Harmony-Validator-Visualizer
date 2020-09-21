async function generateTestData() {
  const pvavalidators = await getPVADetails();
  const parsed = pvavalidators.map((value) => {
    const validator = value.validator;
    const data = {
      name: validator.name,
      validatorAddress: validator.address,
      identity: validator.identity,
      maxChangeRate: validator["max-change-rate"],
      maxTotalDelegation: validator["max-total-delegation"],
    };
    return validator;
  });

  fs.writeFileSync("validatosChain.json", JSON.stringify(parsed), "utf-8");
}

module.exports = generateTestData;
