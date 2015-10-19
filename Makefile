
all:
	rm -rf index.js
	rm -rf shakespeare.zip
	cp lambda.js index.js ; cat jsMegaHal.js >> index.js ; ./process.pl < shakespeare.txt >> index.js
	zip shakespeare.zip index.js

