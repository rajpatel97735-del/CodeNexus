import FileSystem from "./FileSystem";

class FileSync {
  async sync(container, oldFiles = [], newFiles = []) {
    const oldMap = new Map(oldFiles.map(file => [file.path, file]));
    const newMap = new Map(newFiles.map(file => [file.path, file]));

    // Create / Update
    for (const [path, file] of newMap) {
      const previous = oldMap.get(path);

      if (!previous) {
        await this.create(container, file);
        continue;
      }

      if (previous.content !== file.content) {
        await FileSystem.writeFile(
          container,
          path,
          file.content
        );
      }
    }

    // Delete removed files
    for (const [path] of oldMap) {
      if (!newMap.has(path)) {
        await FileSystem.remove(container, path);
      }
    }
  }

  async create(container, file) {
    const parts = file.path.split("/");

    const filename = parts.pop();

    if (parts.length) {
      await FileSystem.mkdir(
        container,
        parts.join("/")
      );
    }

    await FileSystem.writeFile(
      container,
      file.path,
      file.content
    );
  }
}

export default new FileSync();