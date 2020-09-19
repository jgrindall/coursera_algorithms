
export type ProgressItem = {
    explored:boolean,
    dist?:number,
    label?:number
};

export type Component = Array<string>;

export type Progress = {
    [key: string]: ProgressItem
};
