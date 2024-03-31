import Script from "next/script";

const page = () => {
  return (
			<div>
				<Script
					type="text/javascript"
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				/>
        <h1>Dashboard</h1>
			</div>
		);
};
export default page;
