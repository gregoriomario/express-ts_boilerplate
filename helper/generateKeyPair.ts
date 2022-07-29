import crypto from "crypto";
import fs from "fs";
import path from "path";

const generateKeyPair = () => {
	const keyPair = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
			cipher: "aes-256-cbc",
			passphrase: "",
		},
	});

	fs.writeFileSync(
		path.join(__dirname, "..", `id_rsa_pub.pem`),
		keyPair.publicKey
	);
	fs.writeFileSync(
		path.join(__dirname, "..", `id_rsa_priv.pem`),
		keyPair.privateKey
	);
};

generateKeyPair();
