export interface Service {
    name: string;
    slug: string;
    description: string;
    tiers: {
        Basic: number;
        Executive: number;
        Professional: number;
    };
}
