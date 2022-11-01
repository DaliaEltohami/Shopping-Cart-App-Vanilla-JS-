let productsDB = [
  {
    id: 1,
    title: "Professional Camera",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odit!",
    imgURL: "images/camera.jpg",
    size: "small",
    qty: 1,
    isMe: "no",
  },
  {
    id: 2,
    title: "Soft Cream",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odit!",
    imgURL: "images/cream.jpg",
    size: "medium",
    qty: 1,
    isMe: "no",
  },
  {
    id: 3,
    title: "Original Makeup",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odit!",
    imgURL: "images/makeup.jpg",
    size: "small",
    qty: 1,
    isMe: "no",
  },
  {
    id: 4,
    title: "Lacost Watch",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, odit!",
    imgURL: "images/watch.jpg",
    size: "large",
    qty: 1,
    isMe: "no",
  },
];

if (!localStorage.getItem("products"))
  localStorage.setItem("products", JSON.stringify(productsDB));

let allProducts = JSON.parse(localStorage.getItem("products"));
