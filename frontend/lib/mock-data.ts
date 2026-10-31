// export const DEFAULT_BEST_SELLERS = [
//   {
//     id: "1",
//     name: "Sushi Maki Rolls",
//     price: "$10.30",
//     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "2",
//     name: "Roasted Chicken",
//     price: "$50.0",
//     image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "3",
//     name: "Classic Lasagna",
//     price: "$12.99",
//     image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "4",
//     name: "Berry Cupcake",
//     price: "$8.20",
//     image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80",
//   },
// ];

// export const DEFAULT_POPULAR = [
//   {
//     id: "101",
//     name: "Strawberry Shake",
//     date: "29 Nov, 01:20 pm",
//     price: "₹20.00",
//     items: "2 items",
//     image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "102",
//     name: "Chicken Burger",
//     date: "17 Oct, 01:20 pm",
//     price: "₹20.00",
//     items: "1 item",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "103",
//     name: "Pepperoni Pizza",
//     date: "12 Oct, 07:15 pm",
//     price: "₹35.00",
//     items: "1 item",
//     image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&auto=format&fit=crop&q=80",
//   },
//   {
//     id: "104",
//     name: "Creamy Alfredo Pasta",
//     date: "05 Oct, 02:40 pm",
//     price: "₹28.00",
//     items: "2 items",
//     image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=400&auto=format&fit=crop&q=80",
//   },
// ];

export interface PortionOption {
  id: string;
  name: string;
  extraPrice: number;
}

export const PORTIONS: PortionOption[] = [
  { id: "personal", name: "Personal (4 Slides)", extraPrice: 0 },
  { id: "medium", name: "Medium (8 Slides)", extraPrice: 3.0 },
  { id: "familiar", name: "Familiar (10 Slides)", extraPrice: 6.0 },
  { id: "jumbo", name: "Jumbo (12 Slides)", extraPrice: 10.0 },
];


