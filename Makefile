
MANIFEST_FILE = "files/cache.manifest"

.PHOHY: deploy
deploy:
	# ./manifest --update "${MANIFEST_FILE}"
	bun x @cubing/deploy
	# ./manifest --revert "${MANIFEST_FILE}"
	echo "Done deploying. Go to ${URL}"

