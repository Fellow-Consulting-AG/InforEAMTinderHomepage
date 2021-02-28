var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "@angular/platform-browser"], function (require, exports, core_1, platform_browser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Base64VideoPipe = exports.Base64AudioPipe = exports.Base64ImagePipe = void 0;
    /**
     * Transforms raw bas64 image data to a URL that can be used to display it in the browser.
     */
    var Base64ImagePipe = /** @class */ (function () {
        function Base64ImagePipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        Base64ImagePipe.prototype.transform = function (base64Data) {
            return this.sanitizer.bypassSecurityTrustUrl("data:image/" + this.getFileType(base64Data) + ";base64," + base64Data);
        };
        Base64ImagePipe.prototype.getFileType = function (imageData) {
            switch (imageData.charAt(0)) {
                case "/": return "jpeg";
                case "i": return "png";
                case "R": return "gif";
                case "U": return "webp";
                default: return "jpeg";
            }
        };
        Base64ImagePipe = __decorate([
            core_1.Pipe({
                name: "base64Image",
                pure: true,
            }),
            __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
        ], Base64ImagePipe);
        return Base64ImagePipe;
    }());
    exports.Base64ImagePipe = Base64ImagePipe;
    /**
     * Transforms raw bas64 audio data to a URL that can be used to play it in the browser.
     */
    var Base64AudioPipe = /** @class */ (function () {
        function Base64AudioPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        Base64AudioPipe.prototype.transform = function (base64Data, extension) {
            if (extension === void 0) { extension = "wav"; }
            return this.sanitizer.bypassSecurityTrustUrl("data:audio/" + extension + ";base64," + base64Data);
        };
        Base64AudioPipe = __decorate([
            core_1.Pipe({
                name: "base64Audio",
                pure: true,
            }),
            __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
        ], Base64AudioPipe);
        return Base64AudioPipe;
    }());
    exports.Base64AudioPipe = Base64AudioPipe;
    /**
     * Transforms raw bas64 video data to a URL that can be used to play it in the browser.
     */
    var Base64VideoPipe = /** @class */ (function () {
        function Base64VideoPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        Base64VideoPipe.prototype.transform = function (base64Data, extension) {
            if (extension === void 0) { extension = "mp4"; }
            return this.sanitizer.bypassSecurityTrustUrl("data:video/" + extension + ";base64," + base64Data);
        };
        Base64VideoPipe = __decorate([
            core_1.Pipe({
                name: "base64Video",
                pure: true,
            }),
            __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
        ], Base64VideoPipe);
        return Base64VideoPipe;
    }());
    exports.Base64VideoPipe = Base64VideoPipe;
});
//# sourceMappingURL=pipes.js.map