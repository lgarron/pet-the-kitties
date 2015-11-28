
MANIFEST_FILE = "files/cache.manifest"
SFTP_PATH     = "towns.dreamhost.com:~/garron.net/app/cat/"
URL           = "https://garron.net/app/cat/"

.PHOHY: deploy
deploy:
	# ./manifest --update "${MANIFEST_FILE}"
	rsync -avz --exclude .git . "${SFTP_PATH}"
	# ./manifest --revert "${MANIFEST_FILE}"
	echo "Done deploying. Go to ${URL}"

