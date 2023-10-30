const getTotalPrice = latestItems => {
  return latestItems?.reduce(
    (total, item) => +total + +item.price * +item.quantity,
    0
  );
};

export default getTotalPrice;
