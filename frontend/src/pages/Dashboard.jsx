import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getAuthHeaders } from "../api/api";
import { getUserProfile } from "../api/api";
import AIChat from "../components/AIChat";
export default function Dashboard() {

const [user,setUser]=useState({
username:"user.username",
phone:"user.phone",
address:"user.address",
user_id:"user.user_id"
});

const [orders,setOrders]=useState([]);

useEffect(()=>{

fetchData();

},[]);

const fetchData = async () => {
    try {

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            console.log("No user found");
            return;
        }

        // Get user profile
        const response = await getUserProfile();
        const data = response.data;

        console.log(data);

       setUser({
        username: data?.data?.username || "--",
        phone: data?.data?.phone || "--",
        address: data?.data?.address || "--",
      user_id: data?.data?.user_id || "--",
});

        // Continue with orders...
        const orderRes = await fetch("/api/orders", {
            headers: getAuthHeaders(),
        });

        const orderData = await orderRes.json();

        setOrders(Array.isArray(orderData) ? orderData : []);

    } catch (err) {
        console.log(err);
    }
};

const currentOrders=
orders.filter(
o=>
o.status==="pending" ||
o.status==="processing"
).length;


return(

<div className="bg-[#f7f7f8] min-h-screen">

<Navbar/>

<main className="max-w-7xl mx-auto p-8 space-y-8">

<div className="bg-white p-6 rounded-2xl">

<h1 className="text-3xl font-bold">
Welcome {user.username}
</h1>

<div className="mt-4 space-y-2">

<p>Username :  {user.username}</p>

<p>Phone : {user.phone}</p>

<p>Address : {user.address}</p>

<p>User ID : {user.user_id}</p>

</div>

</div>

<div className="grid md:grid-cols-4 gap-4">

<div className="bg-white p-5 rounded-xl">
Total Orders
<h2>{orders.length}</h2>
</div>

<div className="bg-white p-5 rounded-xl">
Current Orders
<h2>{currentOrders}</h2>
</div>

<div className="bg-white p-5 rounded-xl">
Account Status
<h2>Active</h2>
</div>

<div className="bg-white p-5 rounded-xl">
Member Since
<h2>--</h2>
</div>

</div>

</main>

<Footer/>

</div>

)

}