export interface Calories {
    id: string,
    time: string,
    description:string,
    calories: number,
}

export type ApiDish = Omit<Calories, 'id'>;

export interface ApiDishes {
    [id: string]: ApiDish;
}

export interface CaloriesMutation {
    id: string,
    time: string,
    description:string,
    calories: string,
}