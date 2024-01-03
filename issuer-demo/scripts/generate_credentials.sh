#!/usr/bin/env bash

# Generate the P256 private key
priv_key=$(
  openssl ecparam -name prime256v1 -genkey -noout |
  openssl ec -text -noout |
  grep priv -A 3 |
  tail -n +2 |
  tr -d '\n[:space:]:' |
  sed 's/^00//'
)

echo "Private Key: $priv_key"
echo "Save this generated ebsi id: $(echo $RANDOM | md5sum | head -c 32)"