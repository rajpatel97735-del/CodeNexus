export function createVirtualFiles(files) {

    const map = {};

    files.forEach(file => {

        map[file.path] = file.content;

    });

    return map;

}

export function getFile(files, path) {

    return files[path] || "";

}