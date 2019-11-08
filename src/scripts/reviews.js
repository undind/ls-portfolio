import Vue from 'vue';
import axios from 'axios';
import reviews from '../data/reviews';
import Flickity from 'vue-flickity';

new Vue({
  el: '#reviews',
  components: {
    Flickity
  },
  data: {
    reviews,
    currentIndex: 0,
    flickityOptions: {
    pageDots: false,
    prevNextButtons: false,
    adaptiveHeight: true,
    watchCSS: false,
    cellAlign: 'left',
    groupCells: window.innerWidth > 480 ? 2 : 1,
    },
  },
  computed: {
    slidesLength() {
      return window.innerWidth > 480 ? Math.ceil(this.reviews.length / 2) : this.reviews.length;
    },
  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    previous() {
      this.$refs.flickity.previous();
    },
  },
  created() {
    this.reviews = reviews.map((review) => ({
      ...review,
      photo: require(`images/${review.photo}`),
    }));
  },
  mounted() {
    this.$refs.flickity.on('change', (index) => {
      this.currentIndex = index;
    });
  },
});