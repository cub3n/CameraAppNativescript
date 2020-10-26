import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { Mediafilepicker, ImagePickerOptions, VideoPickerOptions, AudioPickerOptions, FilePickerOptions } from 'nativescript-mediafilepicker';
import { isAvailable, requestPermissions, takePicture } from '@nativescript/camera';
import { VideoRecorder, Options as VideoRecorderOptions } from 'nativescript-videorecorder';

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
    tomarFoto(): void {
        requestPermissions().then(
            function success() {
                const Options = {width:300, height: 300, keepAspectRatio:false,saveToGallery: true};
                takePicture(Options).
                then((imageAsset) => {
                console.log("Tamano: " + imageAsset.options.width + "x" + imageAsset.options.height);
                console.log("keepAscpectRatio: " + imageAsset.options.keepAspectRatio);
                console.log("foto guardada");
            }).catch((err) => {
                        console.log("Error -> " + err.message);
                    });
            },
            function failure(){
                console.log("Permiso de camara no aceptado por el usuario");
            }

        );
    }
    takeVideo(): void {        
        const options: VideoRecorderOptions = {
            hd: true,
            saveToGallery: true,
            duration: 30,
            format: 'mp4',
            size: 300,
            position:'back'
        }
        const videorecorder = new VideoRecorder(options)
         
        videorecorder.record().then((data) => {
            console.log(data.file)
            console.log("foto Guardada");
        }).catch((err) => {
            console.log(err)
        })
    }   
    PictureTap(): void {
        
        let options: ImagePickerOptions = {
            android: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 10,
                isNeedFolderList: true
            }, ios: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 10
            }
        };
         
        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.openImagePicker(options);
         
        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results');
            console.dir(results);
        });
         
        // for iOS iCloud downloading status
        mediafilepicker.on("exportStatus", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
         
        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
         
        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }
    VideoTap(): void {
        let allowedVideoQualities = [];
        
        let options: VideoPickerOptions = {
            android: {
                isCaptureMood: false, // if true then camera will open directly.
                isNeedCamera: true,
                maxNumberFiles: 2,
                isNeedFolderList: true,
                maxDuration: 20,
        
            },
            ios: {
                isCaptureMood: false, // if true then camera will open directly.
                videoMaximumDuration: 10,
                allowedVideoQualities: allowedVideoQualities
            }
        };
        
        let mediafilepicker = new Mediafilepicker(); 
        mediafilepicker.openVideoPicker(options);
        
        mediafilepicker.on("getFiles", function (res) {
            let results = res.object.get('results');
            console.dir(results);
        });
        
        // for iOS iCloud downloading status
        mediafilepicker.on("exportStatus", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
        
        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
        
        mediafilepicker.on("cancel", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
    }
}
