const axios = require("axios");

const active = async () => {
  const uptimePoints = await getUrl(
    `http://localhost:5000/result/add/${pvauser["address"]}/results/uptime`
  );

  const newPoints = parseInt(uptimePoints.data["gameResult"]) + 1;
  data = { gameResult: newPoints };

  const update = await putUrl(
    `http://localhost:5000/result/add/${pvauser["address"]}/results/uptime`,
    data
  );
  console.log(
    `updated uptime for ${pvauser["address"]} with ${data}`,
    update.data
  );
};

async function getUrl(url) {
  const response = await axios.get(url);
  return response;
}

async function postUrl(url, data) {
  const headers = { "Content-Type": "application/json" };
  const response = await axios({
    url,
    headers,
    data,
    method: "post",
  });
}

async function putUrl(url, data) {
  const headers = { "Content-Type": "application/json" };

  const result = await axios({
    url,
    data,
    headers,
    method: "put",
  });

  return result;
}

module.exports = { active, getUrl, postUrl, putUrl };
