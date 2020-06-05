import * as fs from 'fs';
import * as path from 'path';
import {v1 as uuid} from 'uuid';

export async function uploadFile(file): Promise<string> {
	try {
		if (!file) {
			return null;
		}
		const relativePath = path.join('/static', `${uuid()}-${file.name}`);
		const filePath = path.join(process.env.PWD, relativePath);
		
		const reader = fs.createReadStream(file?.path);
		const stream = fs.createWriteStream(filePath);
		reader.pipe(stream);
		
		return relativePath;
	} catch (error) {
		console.error('Error_service uploadFile:', error);
		throw new Error('Cannot upload new file');
	}
}
