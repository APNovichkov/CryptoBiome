import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { cryptoBiomeAbi } from "./cryptobiome_abi.js";

// const CONTRACT_ADDRESS = "0x3e6C90354Db791E895107776b95669c2d9C247da";
// const CONTRACT_ADDRESS = "0x341cDF88aF48156C662380a664e12eE313E220FE";
const CONTRACT_ADDRESS = "0x9A27eF46A43FAF4a85314F4D22BC6a1045d32f05";

const Home = () => {
  let [dnaSequence, updateDnaSequence] = useState("");
  let [cryptoBiomeSequences, updateCryptoBiomeSequences] = useState([]);
  let [cryptoBiome, updateCryptoBiome] = useState({});

  const onSubmitCreateBiomeForm = async (event) => {
    event.preventDefault();
    console.log("Submitting form with sequence:", dnaSequence);

    await cryptoBiome.methods.createCryptoBiome(dnaSequence).call();
    const numBiomes = await cryptoBiome.methods.numberBiomes().call();
    console.log(`Num Biomes: ${numBiomes}`);

    cryptoBiome
      .getPastEvents("allEvents", {
        fromBlock: 7343619,
        toBlock: "latest", // You can also specify 'latest'
      })
      .then((events) => console.log(events))
      .catch((err) => console.error(err));
  };

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider);
    console.log(`Given provider: `, Web3.givenProvider);
    const network = await web3.eth.net.getNetworkType();
    console.log(`Network Type: ${network}`);

    const accounts = await web3.eth.getAccounts();
    console.log("Current user account: ", accounts);

    const cryptoBiome = new web3.eth.Contract(cryptoBiomeAbi, CONTRACT_ADDRESS);
    updateCryptoBiome(cryptoBiome);
    console.log(`CryptoBiome:`, cryptoBiome);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="home-wrapper">
      <div className="row">
        <div className="col-md-5">
          <div className="home-card-wrapper">
            <div className="home-card">
              <div className="home-card-title text-center">
                <h4>Create New CryptoBiome</h4>
              </div>
              <form onSubmit={onSubmitCreateBiomeForm} className="createBiomeForm">
                <div className="row">
                  <div className="col-md-9">
                    <div className="form-group">
                      <label for="dnasequence">DNA Sequence</label>
                      <input
                        type="text"
                        className="form-control"
                        value={dnaSequence}
                        onChange={(event) => updateDnaSequence(event.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-md-3 text-right">
                    <button type="submit" className="btn create-biome-button">
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="home-card-wrapper">
            <div className="home-card">
              <div className="home-card-title text-center">
                <h4>View Created Cryptobiomes</h4>
              </div>

              <div className="row">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
