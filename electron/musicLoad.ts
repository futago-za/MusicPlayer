import * as fs from 'fs';
import * as path from 'path';
import * as NodeID3 from 'node-id3';
import mp3Duration from '@rocka/mp3-duration';

export type fileInfo =  {
    album: string,
    artist: string,
    title: string,
    trackNumber: string;
    cover: Buffer,
    format: string,
    src: string,
    duration: number,
    genre: string
}

export const load = async (srcPath: string) => {
    const files: fileInfo[] = [];
    const stat = fs.statSync(srcPath);
    if(stat.isFile()) {
        files.push(await loadFile(srcPath));
    } else if(stat.isDirectory()) {
        const tempFiles = await loadDir(srcPath)
        files.push(...tempFiles);
    } else {
        console.log("不明です");
    }
    return files;
}

const loadDir = (dirPath: string) => {
    const files: fileInfo[] = [];
    fs.readdir(dirPath, {withFileTypes: true}, async (err:any, dirents:any) => {
        if (err) {
            console.error(err);
            return;
        }
        for (const dirent of dirents) {
            const fp = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                loadDir(fp);
            } else {
                files.push(await loadFile(fp));
            }
        }
    });
    return files;
}

const loadFile = async (filePath: string)=> {
    const options = {
        exclude: [],
        onlyRaw: false,
        noRaw: true
    }
    const tags = NodeID3.read(filePath, options);
    const duration = await mp3Duration(filePath);
    const info: fileInfo = {
        album: tags.album as string,
        artist: tags.artist as string,
        title: tags.title as string,
        trackNumber: tags.trackNumber as string,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        cover: tags.image?.imageBuffer as Buffer,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        format: tags.image?.mime as string,
        src: filePath as string,
        duration: duration as number,
        genre: tags.genre as string
    }
    return info;
}