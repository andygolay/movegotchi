#!/bin/sh

set -e

echo "##### Installing aptos cli dependencies #####"
sudo apt-get update
sudo apt-get install -y wget unzip software-properties-common

echo "##### Installing OpenSSL 1.1 runtime #####"
sudo add-apt-repository -y ppa:rael-gc/rvm
sudo apt-get update
sudo apt-get install -y libssl1.1

echo "##### Installing aptos cli #####"
if ! command -v aptos &>/dev/null; then
    echo "aptos could not be found"
    echo "installing it..."
    TARGET=Ubuntu-x86_64
    VERSION=3.5.0
    wget https://github.com/aptos-labs/aptos-core/releases/download/aptos-cli-v$VERSION/aptos-cli-$VERSION-$TARGET.zip
    unzip aptos-cli-$VERSION-$TARGET.zip
    chmod +x aptos
else
    echo "aptos already installed"
fi

echo "##### Info #####"
./aptos info
