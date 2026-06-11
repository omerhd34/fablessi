const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/jpg"]);

const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const BLOCKED_EXTENSIONS = new Set([
 ".mp4",
 ".mov",
 ".avi",
 ".webm",
 ".mkv",
 ".m4v",
 ".wmv",
 ".flv",
 ".mpeg",
 ".mpg",
 ".3gp",
 ".mp3",
 ".wav",
 ".aac",
 ".ogg",
 ".m4a",
]);

const BLOCKED_MIME_PREFIXES = ["video/", "audio/"];

const BLOCKED_MIME_TYPES = new Set([
 "application/mp4",
 "application/x-mp4",
 "application/x-matroska",
 "application/x-quicktime",
 "application/vnd.apple.mpegurl",
]);

export const IMAGE_UPLOAD_INVALID_TYPE_MESSAGE =
 "Yalnızca JPG, PNG veya WebP yükleyebilirsiniz.";

export const ADMIN_DRAFT_UPLOAD_FOLDER = "taslak";

export const IMAGE_UPLOAD_MAX_SIZE_BYTES = 10 * 1024 * 1024;

export function getImageFileExtension(fileName = "") {
 const dot = fileName.lastIndexOf(".");
 return dot === -1 ? "" : fileName.slice(dot).toLowerCase();
}

function hasBlockedExtensionInFileName(fileName = "") {
 const lower = fileName.toLowerCase();

 for (const extension of BLOCKED_EXTENSIONS) {
  const index = lower.indexOf(extension);
  if (index === -1) continue;

  const nextChar = lower[index + extension.length];
  if (index + extension.length === lower.length || nextChar === ".") {
   return true;
  }
 }

 return false;
}

export function validateImageUploadFile(file) {
 if (!file) {
  return "Dosya seçilmedi.";
 }

 const fileName = file.name.trim();
 const extension = getImageFileExtension(fileName);
 const mime = file.type?.toLowerCase() ?? "";

 if (hasBlockedExtensionInFileName(fileName) || BLOCKED_EXTENSIONS.has(extension)) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 if (BLOCKED_MIME_PREFIXES.some((prefix) => mime.startsWith(prefix))) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 if (BLOCKED_MIME_TYPES.has(mime)) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 const typeAllowed = ALLOWED_IMAGE_TYPES.has(mime);
 const extensionAllowed = ALLOWED_IMAGE_EXTENSIONS.has(extension);

 if (mime && !typeAllowed) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 if (!mime && !extensionAllowed) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 if (!mime && !extension) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 if (file.size > IMAGE_UPLOAD_MAX_SIZE_BYTES) {
  return "Dosya 10 MB'dan büyük olamaz.";
 }

 return null;
}

export function getCloudinaryUploadErrorMessage(error) {
 const message = String(error?.message ?? error ?? "").toLowerCase();

 if (
  message.includes("invalid image") ||
  message.includes("unsupported") ||
  message.includes("file format") ||
  message.includes("not allowed") ||
  message.includes("resource type")
 ) {
  return IMAGE_UPLOAD_INVALID_TYPE_MESSAGE;
 }

 return null;
}
