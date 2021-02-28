/**
 * This script will go through widget manifests and create a .resx file with all translations in spceified language.
 * 
 * Usage:
 * node LangFromManifestToResx.js <languageCode> <pathToOutputLocation> <checkSubdirectories> <widgetFolderNames>
 * <languageCode>           o	Language code of translations to extract.
 * <pathToOutputLocation>   Where the output file should be placed, relative to the script location.
 * <checkSubdirectories>    If true, the script assumes that each specified folder in <widgetFolderNames> contains one or more widget folders.
 *                          If false, the script assumes that each folder specified in <widgetFolderNames> is a widget folder.
 * <widgetFolderNames>      o	Path to a folder that contains widget folders, or, one or more direct path to widget folder(s).
 * 
 * Example:
 * node .\LangFromManifestToResx.js en-US .\ true .\Widgets
 * or
 * node .\LangFromManifestToResx.js en-US .\ false .\Widgets\infor.sample.angular.helloworld .\Widgets\infor.sample.angular.example
 */

const fs = require("fs");
const languageCode = process.argv[2];
const outputFolder = process.argv[3];
const checkSubdirectories = (process.argv[4] === "true");
const widgetFolders = process.argv.splice(5);
const outputFileName = languageCode + "-Widgets.resx";
const widgetTitleMaxLength = 40;
const widgetDescrMaxLength = 1024;
const printoutLine = "---------------------------------------------------------------------------------";
let outputFileContent = `<?xml version="1.0" encoding="utf-8"?>
<root>
  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
    <xsd:element name="root" msdata:IsDataSet="true">
      <xsd:complexType>
        <xsd:choice maxOccurs="unbounded">
          <xsd:element name="metadata">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" />
              </xsd:sequence>
              <xsd:attribute name="name" use="required" type="xsd:string" />
              <xsd:attribute name="type" type="xsd:string" />
              <xsd:attribute name="mimetype" type="xsd:string" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="assembly">
            <xsd:complexType>
              <xsd:attribute name="alias" type="xsd:string" />
              <xsd:attribute name="name" type="xsd:string" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="data">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
              <xsd:attribute ref="xml:space" />
            </xsd:complexType>
          </xsd:element>
          <xsd:element name="resheader">
            <xsd:complexType>
              <xsd:sequence>
                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
              </xsd:sequence>
              <xsd:attribute name="name" type="xsd:string" use="required" />
            </xsd:complexType>
          </xsd:element>
        </xsd:choice>
      </xsd:complexType>
    </xsd:element>
  </xsd:schema>
  <resheader name="resmimetype">
    <value>text/microsoft-resx</value>
  </resheader>
  <resheader name="version">
    <value>2.0</value>
  </resheader>
  <resheader name="reader">
    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>
  <resheader name="writer">
    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
  </resheader>`  ;

/**
 * Logs a warning.
 * @param {*} message the message to log. 
 */
function logWarning(message) {
  console.warn(printoutLine);
  console.warn("WARNING: " + message);
  console.warn(printoutLine);
  console.warn("");
}

/**
 * Logs a translation length warning to console.
 * @param {*} type        title or description.
 * @param {*} maxLength   max lenght of specified type.  
 * @param {*} widgetId    widget ID
 */
function logLengthWarning(type, maxLength, widgetId) {
  message = `Widget ${type} is longer than allowed (${maxLength} charachters).
  Widget ID: ${widgetId}`;
  logWarning(message);
}

/**
 * Adds translation item to .resx output file.
 * @param {*} name      translation item name.
 * @param {*} value     translated value.
 * @param {*} comment   optional comment.
 */
function addTranslationToOutput(name, value, comment) {
  outputFileContent += `
  <data name="${name}" xml:space="preserve">
    <value>${value}</value>`;

  if (comment) {
    outputFileContent += `
    <comment>Max ${comment} characters</comment>`;
  }

  outputFileContent += `
  </data>`;
}

/**
 * Copies translations from manifest to output file.
 * @param {*} manifest 
 */
function copyLocalizationsFromManifest(manifest) {
  for (let key in manifest.localization[languageCode]) {
    const name = manifest.widgetId + "_" + key;
    const value = manifest.localization[languageCode][key];

    if (key === "widgetTitle") {
      if (value.length > widgetTitleMaxLength) {
        logLengthWarning("title", widgetTitleMaxLength, manifest.widgetId);
      }
      addTranslationToOutput(name, value, widgetTitleMaxLength);
    } else if (key === "widgetDescription") {
      if (value.length > widgetDescrMaxLength) {
        logLengthWarning("description", widgetDescrMaxLength, manifest.widgetId);
      }
      addTranslationToOutput(name, value, widgetDescrMaxLength);
    } else {
      addTranslationToOutput(name, value);
    }
  }
}

//-------------------------------------------------------------------------------------

console.log("");
console.log("Copying translations...");

if (checkSubdirectories) {
  // widgetFolders contains several widgets.
  widgetFolders.forEach((widgetFolder) => {
    widgetFolder = __dirname + "\\" + widgetFolder;

    console.log("");
    console.info("Looking for widgets in " + widgetFolder);
    const widgets = fs.readdirSync(widgetFolder);

    // Go through each widget manifest and copy localizations
    widgets.forEach((widget) => {
      if (fs.statSync(widgetFolder + "\\" + widget).isDirectory()) {
        let manifest;
        console.info("Copying from manifest in folder: " + widget);

        // Try reading manifest file.
        try {
          manifest = JSON.parse(fs.readFileSync(widgetFolder + "\\" + widget + "\\widget.manifest"));
        } catch (e) {
          logWarning("Could not find a manifest file in folder: " + widgetFolder + "\\" + widget);
        }

        if (manifest) {
          copyLocalizationsFromManifest(manifest);
        }
      }
    });
  });
} else {
  // widgetFolders contains direct paths to widgets.
  widgetFolders.forEach((widgetFolder) => {
    widgetFolder = __dirname + "\\" + widgetFolder;
    console.log(""),
      console.info("Copying from manifest in " + widgetFolder);
    let manifest;

    // Try reading manifest file.
    try {
      manifest = JSON.parse(fs.readFileSync(widgetFolder + "\\widget.manifest"));
    } catch (e) {
      logWarning("Could not find a manifest!");
    }

    if (manifest) {
      copyLocalizationsFromManifest(manifest);
    }
  });
}

//Add .resx-file end
outputFileContent += `
</root>`;

// Write file to output location.
fs.writeFile(outputFolder + "//" + outputFileName, outputFileContent, function (err) {
  if (err) {
    return console.log(err);
  }
});

console.info("");
console.info("Done!");
console.info("");