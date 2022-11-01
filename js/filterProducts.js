function handleProductFilter(e,allProducts) {
    let filterValue = e.target.value;
    if (filterValue == "all") {
      drawProductsUI(allProducts);
    } else {
      let filteredProducts = allProducts.filter(
        (product) => product.size == filterValue
      );
      drawProductsUI(filteredProducts);
    }
}

  