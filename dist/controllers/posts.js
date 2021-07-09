"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const casperClientSDK = require("casper-js-sdk");
const { Keys, CasperClient, CLPublicKey, DeployUtil } = require("casper-js-sdk");
const RPC_API = 'http://3.136.227.9:7777/rpc';
const STATUS_API = 'http://3.136.227.9:8888';
// const sendTransfer = async ({ from, to, amount,id=0 }) => {
const sendTransfer = (trans) => __awaiter(void 0, void 0, void 0, function* () {
    const casperClient = new CasperClient(RPC_API);
    const folder = path.join('./', 'casper_keys');
    // Read keys from the structure created in #Generating keys
    const signKeyPair = Keys.Ed25519.parseKeyFiles(folder + '/' + trans.from + '_public.pem', folder + '/' + trans.from + '_private.pem');
    // networkName can be taken from the status api
    const response = yield axios.get(STATUS_API + "/status");
    let networkName = null;
    if (response.status == 200) {
        networkName = response.data.chainspec_name;
    }
    // For native-transfers the payment price is fixed
    const paymentAmount = 10000000000;
    // transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
    // const id = 187821;
    // const id = 0;
    // gasPrice for native transfers can be set to 1
    const gasPrice = 1;
    // Time that the deploy will remain valid for, in milliseconds
    // The default value is 1800000 ms (30 minutes)
    const ttl = 1800000;
    let deployParams = new DeployUtil.DeployParams(signKeyPair.publicKey, networkName, ttl);
    // We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
    const toPublicKey = CLPublicKey.fromHex(trans.to);
    const session = DeployUtil.ExecutableDeployItem.newTransfer(trans.amount, toPublicKey, null, trans.id);
    const payment = DeployUtil.standardPayment(paymentAmount);
    const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    const signedDeploy = DeployUtil.signDeploy(deploy, signKeyPair);
    // console.log("signedDeploy:",signedDeploy)
    // Here we are sending the signed deploy
    return yield casperClient.putDeploy(signedDeploy);
});
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sendTransfer({
        // Put here the account-address of the sender's account. Note that it needs to have a balance greater than 2.5CSPR
        from: "0184bb74956e70397dbc3e403e9589f8b63db74c47c908447ec78037aa50fad2ff",
        // Put here the account-address of the receiving account. This account doesn't need to exist. If the key is correct, the network will create it when the deploy is sent
        to: "0125a6336791eba195c472a8b7dbcd256a6ecddf8863e586a3dfefe2581a5d672c",
        // Minimal amount is 2.5CSPR so 2.5 * 10000 (1CSPR = 10.000 motes)
        amount: 2500000000,
        id: 0
    });
    res.send("transfer executes!");
});
exports.default = getPosts;
