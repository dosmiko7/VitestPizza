import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
	return (
		<header className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-500">
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
