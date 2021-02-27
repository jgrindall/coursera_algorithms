
export type SSPath = {
    vertices:string[],
    length:number
};

export type SSRecord = Map<string, SSPath>;

export type APSPRecord = Map<number, SSRecord>;
