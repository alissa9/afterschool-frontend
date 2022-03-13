<template>
  <div v-if="checkout">
    <div v-if="!orderSubmitted" class="mainCheckoutContainer">
      <div class="checkoutContainer">
        <h1>Basket</h1>
        <div class="cartContainer">
          <div v-for="carts in cart" :key="carts.id" class="productContainer">
            <img
              v-bind:src="carts.product.image"
              alt="image"
              width="150"
              height="100"
            />
            <p>{{ carts.product.name }}</p>
            <p>Price £{{ carts.product.price * carts.quantity }}</p>
            <p>Quantity: {{ carts.quantity }}</p>

            <button @click="removeItem(carts)">Remove</button>
          </div>
        </div>
      </div>

      <!-- Checkout form -->
      <div class="formContainer">
        <h1>Checkout</h1>
        <p>Enter Your Details To Checkout</p>
        <p>
          <strong>Full Name </strong><span></span
          ><input v-on:input="validateData" v-model="fullName" />
        </p>
        <p>
          <strong>Phone Number </strong
          ><input v-on:input="validateData" v-model="phoneNumber" />
        </p>
        <button v-bind:disabled="!validForm" @click="submitForm">
          place order
        </button>
      </div>
    </div>
    <div v-else-if="orderSubmitted">
      <h1 id="confirmation">Your Order Has Been Placed!</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkOut",
  props: ["cart"],
  data() {
    return {
      checkout: true,
      orderSubmitted: false,
      validForm: false,

      fullName: "",
      phoneNumber: "",
    };
  },
  methods: {
    removeItem(carts) {
      this.$emit("removeItem", carts);
    },
    validateData() {
      if (/^[a-zA-Z]+$/.test(this.fullName) && /^\d+$/.test(this.phoneNumber)) {
        this.validForm = true;
      } else {
        this.validForm = false;
      }
    },

    submitForm() {
      this.$emit("submitForm", this.fullName, this.phoneNumber);
      this.orderSubmitted = true;
      this.phoneNumber = "";
      this.fullName = "";
    },
  },
};
</script>
