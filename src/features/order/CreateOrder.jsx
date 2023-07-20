import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart"
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { useSelector } from "react-redux";
import store from "../../store"
import {formatCurrency} from "../../utils/helpers"
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const CreateOrder = () => {
	const username = useSelector(state => state.user.username)
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "loading";

	const formErrors = useActionData();

	const [withPriority, setWithPriority] = useState(false);
	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + priorityPrice;

	if(!cart.length) return <EmptyCart />

	return (
		<div className="px-4 py-6">
			<h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

			<Form
				method="POST"
				action="/order/new"
			>
				<div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">First Name</label>
					<input
					className="input grow"
						type="text"
						name="customer"
						defaultValue={username}
						required
					/>
				</div>

				<div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">Phone number</label>
					<div className="grow">
						<input
						className="input w-full"
							type="tel"
							name="phone"
							required
							
						/>
						{formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">{formErrors.phone}</p>}
					</div>
				</div>

				<div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
					<label className="sm:basis-40">Address</label>
					<div className="grow">
						<input
							type="text"
							name="address"
							required
							className="input w-full"
						/>
					</div>
				</div>

				<div className="mb-12 flex gap-5 items-center">
					<input
						className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
						type="checkbox"
						name="priority"
						id="priority"
						value={withPriority}
						onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
				</div>

				<div>
					<input
						type="hidden"
						name="cart"
						value={JSON.stringify(cart)}
					/>
					<Button disabled={isSubmitting} type="primary">{isSubmitting ? "Placing order..." : `Order now from ${formatCurrency(totalPrice)}`}</Button>
				</div>
			</Form>
		</div>
	);
}

export const action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};

	const newOrder = await createOrder(order);

	const errors = {};
	if (!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number.";

	if (Object.keys(errors).length > 0) return errors;

	store.dispatch(clearCart());

	return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
