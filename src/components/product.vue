<template>
  <div v-if="!checkout" id="displayProducts">
    <div v-for="product in products" :key="product.id" id="items">
      <img v-bind:src="product.image" alt="image" class="productImage" />
      <p><i class="fas fa-book"></i> {{ product.name }}</p>
      <p>
        <i class="fas fa-map-marked-alt"></i>
        {{ product.location }}
      </p>
      <p><i class="fas fa-pound-sign"></i> {{ product.price }}</p>
      <p>
        <i class="fas fa-history"> </i>
        {{ product.spaces === 0 ? "No Spaces Left " : product.spaces }}
      </p>
      <!-- Add to cart button -->
      <button
        @click="addToCart(product)"
        :disabled="product.spaces === 0"
        id="addCart"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["products"],
  data() {
    return {
      checkout: false,
    };
  },

  methods: {
    addToCart(product) {
      this.$emit("addToCart", product);
    },
  },
};
</script>
