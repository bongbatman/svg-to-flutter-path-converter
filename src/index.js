#! /usr/bin/env node

const { program } = require('commander');
const SvgToFlutterPathConverter = require('./convert');
const fs = require('fs');

program
  .command('convert')
  .description('Convert svg file to Flutter path')
  .argument('<svgFilePath>')
  .option('-o --output <outputPath>', 'Where to store the output file')
  .action(function(filePath, options) {
    converter = new SvgToFlutterPathConverter();
    flutterPathString = converter.convertFromFilePath(filePath);
    let outputPath = options.output;

    if (!outputPath) {
      console.log(flutterPathString);
      return;
    }

    outputPathFs = !fs.existsSync(outputPath) ? null : fs.lstatSync(outputPath);

    if (outputPathFs !== null && outputPathFs.isDirectory()) {
      outputPath += '/output.dart';
    }

    try {
      fs.writeFileSync(outputPath, flutterPathString);
    } catch (err) {
      console.error(err);
    }
  })

program.parse()