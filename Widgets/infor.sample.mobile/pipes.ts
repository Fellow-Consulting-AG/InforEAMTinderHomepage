import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

/**
 * Transforms raw bas64 image data to a URL that can be used to display it in the browser.
 */
@Pipe({
	name: "base64Image",
	pure: true,
})
export class Base64ImagePipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	transform(base64Data: string): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(`data:image/${this.getFileType(base64Data)};base64,${base64Data}`);
	}

	private getFileType(imageData: string): string {
		switch (imageData.charAt(0)) {
			case "/": return "jpeg";
			case "i": return "png";
			case "R": return "gif";
			case "U": return "webp";
			default: return "jpeg";
		}
	}
}

/**
 * Transforms raw bas64 audio data to a URL that can be used to play it in the browser.
 */
@Pipe({
	name: "base64Audio",
	pure: true,
})
export class Base64AudioPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	transform(base64Data: string, extension = "wav"): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(`data:audio/${extension};base64,${base64Data}`);
	}
}

/**
 * Transforms raw bas64 video data to a URL that can be used to play it in the browser.
 */
@Pipe({
	name: "base64Video",
	pure: true,
})
export class Base64VideoPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) { }
	transform(base64Data: string, extension = "mp4"): SafeUrl {
		return this.sanitizer.bypassSecurityTrustUrl(`data:video/${extension};base64,${base64Data}`);
	}
}
