export default function extensionTrimmer(filename){
    return filename
        .replaceAll("_", " ")
        .replace(".pdf", "")
        .replace(".xlsx", "")
        .replace(".xls", "")
        .replace(".docx", "")
        .replace(".doc", "")
}