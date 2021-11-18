new Vue({
    el: "#app",
    data: {
        showProduct: true,
        sitename: "After School Club",
        products: products,
        cart: [],
        sortOption: "",
        options: ["High-Price", "Low-Price", "Lessons A-Z", "Lessons Z-A", "Low-Availability", "High-Availability", "Location A-Z", "Location Z-A"],
        order: {
            fullName: "",
            phoneNumber: "",
        },
        validForm: false,
        searchText: "",
        serachResults: products,
    },
    methods: {
        addToCart(product) {
            this.cart.push(product);
        },

        showCheckout() {
            this.showProduct = !this.showProduct;

        },
        submitForm() {
            alert("order Submitted");
        },
        canAddToCart(product) {
            return product.spaces > this.cartCount(product);
        },
        cartCount(product) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    count++;
                }
            }
            return count;
        },
        itemLeft(product) {
            return product.spaces - this.cartCount(product);
        },

        removeItem(product) {
            this.cart = this.cart.filter((item) => item.id != product.id)

        },

        validateData() {
            if (/^[a-zA-Z]+$/.test(this.order.fullName) && (/^\d+$/.test(this.order.phoneNumber))) {
                this.validForm = true;
            } else {
                this.validForm = false;
            }

        },
        searchProduct() {
            this.serachResults = this.products.filter((product) => product.name.toLowerCase().includes(this.searchText.toLowerCase()));
            console.log("nice");

        },

        sortBy() {
            switch (this.sortOption) {
                case "Low-Price":
                    this.products.sort((a, b) => a.price - b.price);
                    this.serachResults.sort((a, b) => a.price - b.price);
                    break;
                case "High-Price":
                    this.products.sort((a, b) => b.price - a.price);
                    this.serachResults.sort((a, b) => b.price - a.price);
                    break;
                case "Low-Availability":
                    this.products.sort((a, b) => a.spaces - b.spaces);
                    this.serachResults.sort((a, b) => a.spaces - b.spaces);
                    break;
                case "High-Availability":
                    this.products.sort((a, b) => b.spaces - a.spaces);
                    this.serachResults.sort((a, b) => b.spaces - a.spaces);
                    break;
                case "Location A-Z":
                    this.products.sort((a, b) => a.location.toLowerCase().localeCompare(b.location.toLowerCase()));
                    this.serachResults.sort((a, b) => a.location.toLowerCase().localeCompare(b.location.toLowerCase()));
                    break;
                case "Location Z-A":
                    this.products.sort((a, b) => b.location.toLowerCase().localeCompare(a.location.toLowerCase()));
                    this.serachResults.sort((a, b) => b.location.toLowerCase().localeCompare(a.location.toLowerCase()));
                    break;
                case "Lessons A-Z":
                    this.products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
                    this.serachResults.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
                    break;
                case "Lessons Z-A":
                    this.products.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
                    this.serachResults.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
                    break;

                default:
                    break;
            }
        }
    },
    computed: {
        cartItemCount() {
            return this.cart.length;
        },



    }
});