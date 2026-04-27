const API_URL = "http://localhost:3000/api";

export const updateOrderStatus = async (orderId, status, token) => {
  const res = await fetch(`${API_URL}/order/${orderId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};