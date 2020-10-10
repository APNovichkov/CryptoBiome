from brownie import *


def main():
    accounts.load("metamask1")
    return CryptoBiomeEnvironment.deploy({'from': accounts[0]})
