import { ApiDishes, Calories } from "../../types.ts";
import { useCallback, useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import HomeItem from "../HomeItem/HomeItem.tsx";
import Spinner from "../../components/Spinner/Spinner.tsx";

const Home = () => {
    const [cartCalories, setCartCalories] = useState<Calories[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOneDish = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi.get<ApiDishes | null>('/dishes.json');
            const caloriesResponse = response.data;

            console.log("Response from server:", caloriesResponse);

            if (caloriesResponse !== null) {
                const calories: Calories[] = Object.keys(caloriesResponse).map((id: string) => ({
                    ...caloriesResponse[id],
                    id,
                }));
                setCartCalories(calories);
            } else {
                setCartCalories([]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching dishes:", error);
            setCartCalories([]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchOneDish();
    }, [fetchOneDish]);

    if (loading) {
        return <Spinner/>;
    }

    return (
        <div className="container d-flex flex-row align-items-center flex-wrap justify-content-center">
            {cartCalories.map((item, index) => (
                <HomeItem key={index}
                          dishTime={item.time}
                          dishDescription={item.description}
                          dishCalories={item.calories}
                          dishId={item.id}/>
            ))}
        </div>
    );
};

export default Home;
