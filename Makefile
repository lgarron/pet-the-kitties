
MANIFEST_FILE = "files/cache.manifest"
SFTP_PATH     = "towns.dreamhost.com:~/garron.net/app/cat-mp4/"
URL           = "https://garron.net/app/cat-mp4/"

.PHOHY: deploy
deploy:
	# ./manifest --update "${MANIFEST_FILE}"
	rsync -avz --exclude .git . "${SFTP_PATH}"
	# ./manifest --revert "${MANIFEST_FILE}"
	echo "Done deploying. Go to ${URL}"

