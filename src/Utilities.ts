import { Core } from './global';
import { FilePath } from './FilePath'
import { Uri, window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';

export function readFile(path: string){
    var _fse = require('fs');
    _fse.readFile(path, function (err, data) {
        Core.fileInfo = data.toString().split("\n");
        // console.log("Asynchronous read: " + data.toString());

        for(let i in Core.fileInfo) {
            console.log(Core.fileInfo[i]);
        }
    });
}

export function checkExists(path: string){
    var _fse = require('fs');
    _fse.open(path, 'r', function(err, fd) {

        if (err) {
            if(err.code === 'ENOENT') {
                Core.fileExists = false;
            } 
        }

        if(Core.fileExists){
            readConfig(Core.configFile);
        }
        else{
            FilePath();
        }
    });
}

export function createFile(){
    var _fse = require('fs');    
    var tempFile = Core.filePath + Core.fileName + Core.fileType;
    console.log(tempFile);
    _fse.writeFile(tempFile, Core.fileInfo.join('\n'), function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });

    Core.fileInfo = [];
}

export function createConfig(){
    var _fse = require('fs');
    _fse.writeFile(Core.configFile, Core.filePath, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log(Core.filePath);
        console.log("Config file created!");
    });
}

export function readConfig(path: string){
    var _fse = require('fs');
    _fse.readFile(path, function (err, data) {
        var x = data.toString();
        Core.configContent = x;
        Core.filePath = x;
    });
}

export function setConfig(userpath :Uri[]){
    Core.filePath = userpath[0].fsPath;
    createConfig();
}