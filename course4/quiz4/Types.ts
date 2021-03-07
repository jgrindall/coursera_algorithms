export enum ExploredType{
    UNEXPLORED = "unexplored",
    EXPLORING = "exploring",
    EXPLORED = "explored"
};

export type ProgressItem = {
    explored:ExploredType,
    finishingTime?:number,
    source?:string
};

export type Component = Array<string>;

export type Components  = {
    [key: string]: Component
};

export type Progress = {
    [key: string]: ProgressItem
};
