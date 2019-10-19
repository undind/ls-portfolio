import Vue from "vue";

const skill = {
  template: "#skill",
  props: ["skillName", "skillPercent"],
  methods: {
    drawColoredCircle(value) {
      const circle = this.$refs["color-circle"];
      const dashArray = parseInt(
        getComputedStyle(circle).getPropertyValue("stroke-dasharray")
      );
      const percent = (dashArray / 100) * (100 - value);
      
      circle.style.strokeDashoffset = percent;
    },
    onIntersecting(entries) {
      entries.forEach((entry) => {
        if (entry.target === this.$el) {
          const value = entry.isIntersecting ? this.skillPercent : 0;
          this.drawColoredCircle(value);
        }
      });
    }
  },
  mounted() {
    this.drawColoredCircle();

    const observer = new IntersectionObserver(this.onIntersecting);
    observer.observe(this.$el);
  },
};

const skillsRow = {
  template: "#skills-row",
  components: { skill },
  props: ["skill"]
};

new Vue({
  el: "#skills-components",
  template: "#skills-list",
  created() {
    this.skills = require('../data/skills.json');
  },
  components: { skillsRow }
});