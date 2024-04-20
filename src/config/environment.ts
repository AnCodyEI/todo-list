import * as fs from 'fs';
import * as path from 'path';
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Environment {
    private configData: Record<string, any> = {};

    constructor(configPath: string = './src/config') {
        const files = fs.readdirSync(configPath);
        files.forEach(file => {
            if (file.endsWith('.json')) {
                const filePath = path.join(configPath, file);
                const fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });
                this.configData[file] = JSON.parse(fileData);
            }
        });
    }

    private getConfigData(): Record<string, string> {
        if (process.env.NODE_ENV === 'production') {
            return this.configData['prod.json'];
        } else {
            return this.configData['dev.json'];
        }
    }

    public getDbURL(): string {
        const env = this.getConfigData()['mariadb'];
        return `mariadb://${env['user']}:${env['password']}@localhost:${env['port']}/${env['database']}`;
    }
}
