const axios = require("axios");
const cheerio = require("cheerio");
const core = require("@actions/core");

async function fetchEKSVersion() {
  try {
    const response = await axios.get(
      "https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html"
    );
    const $ = cheerio.load(response.data);
    const versionText = $("div#main-col-body>h2")
      .first()
      .attr("id")
      .match(/(?<version>\d+\.\d+)/).groups["version"];

    console.log(`Latest EKS Version: ${versionText}`);
    core.setOutput("latest", versionText);
  } catch (error) {
    console.error(`Failed to fetch EKS version: ${error}`);
    core.setFailed(`Action failed with error: ${error}`);
  }
}

fetchEKSVersion();
