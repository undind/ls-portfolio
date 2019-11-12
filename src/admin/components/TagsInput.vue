<template lang="pug">
  .tags-input
    simple-input(
      :value="value"
      :label="label"
      :error-message="errorMessage"
      @input="$emit('input', $event)"
    )
    .tags-input__tags
      tags(
        :tags="tags"
        :is-readonly="false"
        color="grey"
        @remove="onRemoveTag"
      )
</template>

<script>
export default {
  components: {
    SimpleInput: () => import('components/SimpleInput.vue'),
    Tags: () => import('components/Tags.vue')
  },
  props: {
    value: {
      type: String | Number,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    tags() {
      return this.value.split(',').map(substr => substr.trim()).filter(tag => !!tag);
    }
  },
  methods: {
    onRemoveTag(index) {
      const filteredTags = this.tags.filter((tag, i) => i !== index);
      this.$emit('input', filteredTags.join(', '));
    }
  },
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.tags-input {
  position: relative;
  width: 100%;
}

.tags-input__tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
}


</style>