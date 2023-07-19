import CreateUser from "../features/user/CreateUser";

const Home = () => {
	return (
		<div className="text-center mb-10 mt-10 sm:my-16">
			<h1 className="text-xl font-semibold mb-4">
				The best pizza.
				<br />
				<span className="text-yellow-500">Straight out of the oven, straight to you.</span>
			</h1>
			<CreateUser />
		</div>
	);
};

export default Home;
