import parseCSV from "./parseCSV";

export default class UploadedFile {
    static fromFile(file, contents) {
        const f = new UploadedFile();
        f.id = Date.now();
        f.name = file.name;
        f.lastModified = file.lastModified;
        f.contents = contents;
        return f;
    }

    static fromLocalForage(file) {
        const f = new UploadedFile();
        f.id = file.id;
        f.name = file.name;
        f.lastModified = file.lastModified;
        f.contents = file.contents;
        return f;
    }

    get transactions() {
        if (!this.contents) return [];
        return parseCSV(this.contents)?.transactions ?? [];
    }
}
