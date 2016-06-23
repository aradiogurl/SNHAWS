#!/bin/sh

# setup the server keys and certs
serverKeyRoot=keys
if [ ! -d ${serverKeyRoot} ]
then
    mkdir ${serverKeyRoot}
fi
if [ ! -f ${serverKeyRoot}/default.key  ]
then
    echo "Setting up self signed server keys"
    cd ${serverKeyRoot}
    echo "You will be asked to enter a passphrase, use the same one each time"
    openssl genrsa -des3 -out default.key 1024
    openssl req -new -key default.key -out default.csr
    cp default.key default.key.org
    openssl rsa -in default.key.org -out default.key
    openssl x509 -req -days 365 -in default.csr -signkey default.key -out default.crt
    cd ..
else
    echo "Keys already setup"
fi

# sets up the tech document root for SNHAWS

techDocsRoot=snhaws-tech-docs

if [ ! -d ${techDocsRoot} ]
then
	mkdir ${techDocsRoot}
	touch ${techDocsRoot}/snhawsServerTechDoc.md
	touch ${techDocsRoot}/snhawsApiTechDoc.md
  echo "Setup tech docs directory as ${techDocsRoot}"
else
	echo "Tech Docs already setup"
fi
