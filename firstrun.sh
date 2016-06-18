#!/bin/sh

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
