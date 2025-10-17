//src/generate_connectips_key/generate_connectips_key.js

// generate_connectips_key.js
// Generates RSA keypair and prints a .env-ready CONNECTIPS_PRIVATE_KEY value.

import { generateKeyPairSync } from 'crypto';
import fs from 'fs';
import path from 'path';

const outDir = process.cwd();
const privatePath = path.join(outDir, 'private_key.pem');
const publicPath = path.join(outDir, 'public_key.pem');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
});

// Write PEM files
fs.writeFileSync(privatePath, privateKey, { encoding: 'utf8', mode: 0o600 });
fs.writeFileSync(publicPath, publicKey, { encoding: 'utf8' });

console.log('Files created:');
console.log('  ' + privatePath);
console.log('  ' + publicPath);

// Create .env-friendly escaped string (replace real newlines with \n)
const escaped = privateKey.replace(/\r?\n/g, '\\n');
console.log('\nCOPY THIS for your .env (paste value including the quotes):\n');
console.log(`CONNECTIPS_PRIVATE_KEY="${escaped}"\n`);

// Also print a shorter preview
console.log('PEM preview:');
console.log(privateKey.split('\n').slice(0,3).join('\\n') + '\\n...\\n' + privateKey.split('\n').slice(-2).join('\\n'));
