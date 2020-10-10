import brownie
import pytest


@pytest.fixture(scope="module")
def token(CryptoBiomeEnvironment, accounts):
    return CryptoBiomeEnvironment.deploy({'from': accounts[0]})


@pytest.fixture(autouse=True)
def shared_setup(fn_isolation):
    pass


def test_number_biomes_is_zero_at_deployment(accounts, token):
    assert token.numberBiomes() == 0

def test_update_num_biomes(accounts, token):
    token.createCryptoBiome("ATCG")
    assert token.numberBiomes() == 1

    token.createCryptoBiome("ATCG")
    assert token.numberBiomes() == 2

def test_length_biomes_array(accounts, token):
    token.createCryptoBiome("ATCH")
    assert token.cryptoBiomes().length == 1
 

