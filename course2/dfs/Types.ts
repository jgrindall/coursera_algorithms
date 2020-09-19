export enum ExploredType{
    UNEXPLORED = 0,
    EXPLORED = 1,
    EXPLORING = 2
};

export type ProgressItem = {
    explored:ExploredType,
    dist?:number,
    label?:number
};

export type Component = Array<string>;

export type Progress = {
    [key: string]: ProgressItem
};
