export interface Calories {
    id: string,
    time: string,
    description:string,
    calories: string,
}

export type ApiDish = Omit<Calories, 'id'>;

export interface ApiDishes {
    [id: string]: ApiDish;
}

export interface CaloriesMutation {
    time: string,
    description:string,
    calories: number,
}