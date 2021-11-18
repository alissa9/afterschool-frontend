new Vue({
  el: "#app",
  data: {
    showProduct: true,
    sitename: "After School Club",
    products: products,
    cart: [],
    orderOption: "",
    sortOption: "",
    options: [
      "Price",
      "Lessons",
      "Availability",
      "Location",
    ],
    orderSubmitted:false,
    order: {
      fullName: "",
      phoneNumber: "",
    },
    validForm: false,
    searchText: "",
    serachResults: products,
  },
  methods: {
    // Add products to cart
    addToCart(product) {
      this.cart.push(product);
    },
    // Toggle checkout
    showCheckout() {
      this.showProduct = !this.showProduct;
    },
    // Checks if there is space to add to cart
    canAddToCart(product) {
      return product.spaces > this.cartCount(product);
    },
    // Counts the products in the cart
    cartCount(product) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === product.id) {
          count++;
        }
      }
      return count;
    },
    // Substract item when added to cart
    itemLeft(product) {
      return product.spaces - this.cartCount(product);
    },
    // Remove item from basket
    removeItem(product) {
      this.cart = this.cart.filter((item) => item.id != product.id);
    },
    // Validate input
    validateData() {
      if (
        /^[a-zA-Z]+$/.test(this.order.fullName) &&
        /^\d+$/.test(this.order.phoneNumber)
      ) {
        this.validForm = true;
      } else {
        this.validForm = false;
      }
    },
    // Search products
    searchProduct() {
      this.serachResults = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      console.log("nice");
    },

    submitForm() {
      this.orderSubmitted=true;
      this.cart=[];
      
    },

    // Sort products by
    sortBy() {
      switch (this.sortOption) {
        case "Price":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) => a.price - b.price);
            this.serachResults.sort((a, b) => a.price - b.price);
          } else {
            this.products.sort((a, b) => b.price - a.price);
            this.serachResults.sort((a, b) => b.price - a.price); 
          }
          break;


        case "Availability":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) => a.spaces - b.spaces);
            this.serachResults.sort((a, b) => a.spaces - b.spaces);
         
          } else {
            this.products.sort((a, b) => b.spaces - a.spaces);
            this.serachResults.sort((a, b) => b.spaces - a.spaces);
           
          }
          break;

        case "Location":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) => a.location.toLowerCase().localeCompare(b.location.toLowerCase()));
            this.serachResults.sort((a, b) => a.location.toLowerCase().localeCompare(b.location.toLowerCase()));
          } else {
            this.products.sort((a, b) => b.location.toLowerCase().localeCompare(a.location.toLowerCase()));
            this.serachResults.sort((a, b) => b.location.toLowerCase().localeCompare(a.location.toLowerCase()));
          }
          break;

        case "Lessons":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) =>a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            this.serachResults.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

            
          }else{
            this.products.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
            this.serachResults.sort((a, b) =>  b.name.toLowerCase().localeCompare(a.name.toLowerCase()));

          }

        
          break;

        default:
          break;
      }
    },

  },
  computed: {
    cartItemCount() {
      return this.cart.length;
    },
    
  },
});
