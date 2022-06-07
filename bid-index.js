"use strict";

(() => {
  require("dotenv").config({ path: `./.${process.env.NODE_ENV || "local"}.env` });
})();

const express = require("express");
const cors = require("cors");
const app = express();
const { redisClient } = require("./helpers/redis");
const { findRandom } = require("./helpers/util");
const { publish } = require("./helpers/zeromq-pubber");
const { encrypt } = require("./helpers/util");

app.use(cors());
app.use(express.json());

const ENCRYPTION_KEY = "RewaudioSalt";

const createBidResponseId = (publisherId, appId = null, ts = new Date().valueOf()) => {
  let plainId = `${publisherId}`;
  if (appId) {
    plainId += `_${appId}`;
  }
  plainId += `_${ts}`;
  return encrypt(plainId, ENCRYPTION_KEY);
}

app.post("/", async (req, res) => {
  try {
    const key = findRandom(4);
    const resp = await redisClient.get(`${key}`);
    const NO_FILL_STATUS_RES = {
      status: "no-fill"
    };
    let apiResp = {
      ...NO_FILL_STATUS_RES
    };
    if (resp) {
      apiResp = JSON.parse(resp);
    }
    const ts = new Date().valueOf();
    const dataToPublish = {
      bid_request_id: req.body.id,
      publisher_id: req.body.publisher_id,
      timestamp: ts
    };
    if (req.body.app_id) {
      dataToPublish.app_id = req.body.app_id;
    }
    if (apiResp.status !== NO_FILL_STATUS_RES.status) {
      dataToPublish.bid_response_id = createBidResponseId(dataToPublish.publisher_id, dataToPublish.app_id, ts);
    }
    // if (req.body.user &&  req.body.user.googleadid) {
    //   dataToPublish.user_id = req.body.user.googleadid;
    // }
    await publish("impressions", dataToPublish);
    return res.status(200).json(apiResp);
  } catch (e) {
    console.log(e);
    res.status(e.statusCode || 500).json({
      succces: false,
      message: e.statusCode ? e.message : "Something went wrong"
    });
  }
});
const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// bidder_api and processing_api on same server

