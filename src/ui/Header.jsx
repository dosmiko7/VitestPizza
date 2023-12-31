import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
	return (
		<header className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-500 sm:px-6 grid grid-cols-3 justify-items-center">
			<Link
				to="/"
				className="tracking-widest"
			>
				The Vitest Pizza{" "}
			</Link>
			<SearchOrder />
			<Username />
		</header>
	);
};

export default Header;
