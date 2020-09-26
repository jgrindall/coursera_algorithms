
export type PathItem = {
    length:number,
    route: Array<string>
};

export type Paths = {
    [key: string]: PathItem
};
