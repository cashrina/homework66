import React from "react";
import { NavLink } from "react-router-dom";

interface HomeItemProps {
    dishTime: string;
    dishDescription: string;
    dishCalories: number;
    dishId: string;
}

const HomeItem: React.FC<HomeItemProps> = ({ dishTime, dishDescription, dishCalories,dishId }) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4 mx-3">
            <div className="card h-100 shadow-lg">
                <div className="card-header">
                    <p className="card-text fw-lighter">{dishTime}</p>
                </div>
                <div className="card-body">
                    <p className="card-title">{dishDescription}</p>
                    <h4 className="card-title">{dishCalories}</h4>
                    <NavLink to={`/dishes/${dishId}/edit`} className="btn btn-primary">
                        Edit
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default HomeItem;