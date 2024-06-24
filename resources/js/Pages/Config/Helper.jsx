import laravel from "../Image/laravel.png";
import javascripts from "../Image/javascripts.png";
import react from "../Image/react.png";
import User1 from "../Image/user.png";
import User2 from "../Image/user2.png";
import Arlen from "../Image/arlen.jpg";

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const logo = {
    laravel: laravel,
    javascripts: javascripts,
    react: react,
};

export const user = {
    user1: User1,
    user2: User2,
    arlen: Arlen,
};
