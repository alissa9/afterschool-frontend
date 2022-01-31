new Vue({
  el: "#app",
  data: {
    showProduct: true,
    sitename: "After School Club",
    products: null,
    cart: [],
    orderOption: "",
    sortOption: "",
    options: ["Price", "Lessons", "Availability", "Location"],
    orderSubmitted: false,
    order: {
      fullName: "",
      phoneNumber: "",
    },
    validForm: false,
    searchText: "",
    currentID: null,
    orderID: null,
    completedOrder: false,
  },

  // fetching a list of lesson once the app opens
  created() {
    this.getLessonsfromDB();
  },
  methods: {
    getLessonsfromDB() {
      fetch("http://localhost:3000/collection/lessons")
        .then((res) => res.json())
        .then((data) => {
          this.products = data;
        });
    },
    // Add products to cart
    addToCart(product) {
      this.currentID = product._id;
      console.log(this.currentID);
      const index = this.cart.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (index >= 0) {
        this.cart[index].quantity += 1;
      } else {
        const cartItem = {
          product: product,
          quantity: 1,
        };
        this.cart.push(cartItem);
      }
      this.updateSpaces(product._id, product.spaces, 1);
    },
    // Toggle checkout
    showCheckout() {
      this.showProduct = !this.showProduct;
      this.completedOrder = false;
      this.getLessonsfromDB();
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
    updateSpaces(productId, spaces, quantity) {
      const leftSpace = spaces - quantity;
      fetch(`http://localhost:3000/collection/lessons/${productId}`, {
        method: "PUT",
        headers: {
          accept: "application/json, text/plain, */*",
          "content-Type": "application/json",
        },
        body: JSON.stringify({ spaces: leftSpace }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.getLessonsfromDB();
        });
    },

    // remove lessons from cart then add back removed
    removeItem(carts) {
      carts.quantity -= 1;
      if (carts.quantity == 0) {
        this.cart = this.cart.filter(
          (item) => item.product._id != carts.product._id
        );
      }
      // Returing spaces after removing from basket
      const currentProduct = this.products.filter(
        (product) => product._id == carts.product._id
      );
      fetch(`http://localhost:3000/collection/lessons/${carts.product._id}`, {
        method: "PUT",
        headers: {
          accept: "application/json, text/plain, */*",
          "content-Type": "application/json",
        },
        body: JSON.stringify({ spaces: currentProduct[0].spaces + 1 }),
      })
        .then((res) => res.json())
        .then((res) => {
          this.getLessonsfromDB();
        });
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
    // fetch request to search products in database
    searchProduct() {
      fetch(
        "http://localhost:3000/collection/lessons/search?q=" + this.searchText
      )
        .then((res) => res.json())
        .then((data) => {
          this.products = data;
        });
    },

    async submitForm() {
      this.orderSubmitted = true;
      this.cart.forEach((carts) => {
        const {
          product: { _id, spaces, name },
          quantity,
        } = carts;
        fetch("http://localhost:3000/collection/orders", {
          method: "POST",
          headers: {
            accept: "application/json, text/plain, */*",
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            lessonID: _id,
            subject: name,
            space: quantity,
            name: this.order.fullName,
            number: this.order.phoneNumber,
            PurchaseDate: new Date().toDateString(),
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            this.orderId = res.orderId;
            this.updateSpaces(_id, spaces, quantity);
            this.cart = [];
          });
      });
    },

    // this.orderSubmitted = false;
    // this.completedOrder = true;

    // Sort products by
    sortBy() {
      switch (this.sortOption) {
        case "Price":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) => a.price - b.price);
          } else {
            this.products.sort((a, b) => b.price - a.price);
          }
          break;

        case "Availability":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) => a.spaces - b.spaces);
          } else {
            this.products.sort((a, b) => b.spaces - a.spaces);
          }
          break;

        case "Location":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) =>
              a.location.toLowerCase().localeCompare(b.location.toLowerCase())
            );
          } else {
            this.products.sort((a, b) =>
              b.location.toLowerCase().localeCompare(a.location.toLowerCase())
            );
          }
          break;

        case "Lessons":
          if (this.orderOption == "Ascending") {
            this.products.sort((a, b) =>
              a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            );
          } else {
            this.products.sort((a, b) =>
              b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            );
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
