export default function useCartToLocalStorage(item, job) {

  let items = [
    ...(JSON.parse(localStorage.getItem("userCart")) || []),
  ];

  if (items.length === 0) {
    return localStorage.setItem(
      "userCart",
      JSON.stringify([
        {
          food: item,
          id: item.availableAt + item.name + item.price + item.isExclusive,
          indexInCart: items.length + 1,
          quantity: 1,
        },
      ])
    );
  }
  const itemId = item.availableAt + item.name + item.price + item.isExclusive;
  const exist = items.findIndex((item) => item.id === itemId)



  let finalArray;

  if (exist === -1) {
    finalArray = [...items, { food: item, id: item.availableAt + item.name + item.price + item.isExclusive, indexInCart: items.length + 1, quantity: 1, },]

    localStorage.removeItem("userCart");
    return localStorage.setItem(
      "userCart",
      JSON.stringify(finalArray)
    );


  } else if (exist !== -1 && (job === "up" || "down")) {
    const theItemToChange = items.find((sItem) => sItem.food.availableAt + sItem.food.name + sItem.food.price + sItem.food.isExclusive === itemId);


    if (job === "delete") {


      const copiedArray = [...items]
      copiedArray.splice(exist, 1);
      localStorage.removeItem("userCart");
      return localStorage.setItem(
        "userCart",
        JSON.stringify(copiedArray)
      );

    }


    const changedItem = job === "up" && {
      ...theItemToChange,
      quantity: theItemToChange.quantity + 1,
    } ||
      job === "down" && {
        ...theItemToChange,
        quantity: theItemToChange.quantity - 1,
      }

    const replacedArrayWithTheUpdatedOne = items.map(product => {
      if (product.food.availableAt + product.food.name + product.food.price + product.food.isExclusive === itemId) {
        return changedItem;
      } else {
        return product;
      }
    });

    // console.log(replacedArrayWithTheUpdatedOne)


    localStorage.removeItem("userCart");

    return localStorage.setItem(
      "userCart",
      JSON.stringify(replacedArrayWithTheUpdatedOne)
    );
  }


}



