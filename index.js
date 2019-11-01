const express = require('express');
const obfuscator = require('javascript-obfuscator');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.get('*.js', (req, res) => {
    res.send(obfuscator.obfuscate(fs.readFileSync(`${__dirname}\\target\\${req.url.replace(/\//g, '\\')}`),
        {
        compact: true,
            controlFlowFlattening: true,
            renameGlobals: true,
            unicodeEscapeSequence: true,
            stringArray: true,
            rotateStringArray: true,
            deadCodeInjection: true,
            selfDefending: true,
    }).getObfuscatedCode());
});

app.listen(3000, () => {
    console.log('fuck');
});