import { Files } from "./models/file.model";

export const FILE_REPOSITORY = 'FILE_REPOSITORY';

export const fileProviders = [
    {
        provide: FILE_REPOSITORY,
        useValue: Files,
    },
]