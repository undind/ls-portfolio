import Vue from "vue";
import constants from '../styles/variables.json';
import axios from 'axios';

const thumbs = {
  template: "#slider-thumbs",
  props: ["works", "currentIndex"]
};

const btns = {
  template: "#slider-btns",
  props: {
    isDisabledPrev: {
      type: Boolean,
    },
    isDisabledNext: {
      type: Boolean,
    }
  },
  methods: {
    onPrevButtonClick() {
      if (!this.isDisabledPrev) {
        this.$emit('prev-slide');
      }
    },
    onNextButtonClick() {
      if (!this.isDisabledNext) {
        this.$emit('next-slide');
      }
    },
  },
};

const display = {
  template: "#slider-display",
  components: { thumbs, btns },
  props: {
    works: {
      type: Array,
    },
    currentWork: {
      type: Object,
    },
    currentIndex: {
      type: Number,
    },
  },
  watch: {
    currentIndex(currentIndex) {
      if (currentIndex < this.offset) {
        this.offset = currentIndex;
      } else if (currentIndex > this.offset + this.maxThumbsCount - 1) {
        this.offset = currentIndex - this.maxThumbsCount + 1;
      }
    },
  },
  data() {
    return {
      windowWidth: 0,
      offset: 0,
    };
  },
  computed: {
    maxThumbsCount() {
      if (this.windowWidth < parseInt(constants['bp-phones'])) {
        return 0;
      }
      if (this.windowWidth < parseInt(constants['bp-tablets'])) {
        return 2;
      }
      if (this.windowWidth < parseInt(constants['bp-desktop-hd']) + 1) {
        return 3;
      }
      return 4;
    }
  },
  methods: {
    goToPrevSlide() {
      if (this.currentIndex > 0) {
        this.goToSlide(this.currentIndex - 1);
      } 
    },
    goToNextSlide() {
      if (this.currentIndex < this.works.length - 1) {
        this.goToSlide(this.currentIndex + 1);
      }
    },
    goToSlide(index) {
      this.$emit('change-slide', index)
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.setWindowWidth();
  },
  created() {
    window.addEventListener('resize', this.setWindowWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWindowWidth);
  },
};

const tags = {
  template: "#slider-tags",
  props: ["tags"]
};

const info = {
  template: "#slider-info",
  components: { tags },
  props: ["currentWork"],
  computed: {
    tagsArray() {
      return this.currentWork.skills.split(', ');
    }
  },
};

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: { display, info },
  data: () => ({
    works: [],
    currentWorkIndex: 0
  }),
  computed: {
    currentWork() {
      return this.works[this.currentWorkIndex];
    },
  },
  methods: {
    async fetchWorks() {
      const { data: works } = await axios.get(`${process.env.BASE_URL}/works/${process.env.USER_ID}`);
      this.works = works.map(item => ({
        ...item,
        photo: `${process.env.BASE_URL}/${item.photo}`
      }));
    },
    changeSlide(value) {
      this.currentWorkIndex = value;
    }
  },
  created() {
    this.fetchWorks();
  },
});