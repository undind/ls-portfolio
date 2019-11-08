<template lang="pug">
  .picture-upload
    label.picture-upload__control(
      for="file-input"
      :class="{ 'picture-upload__control-drag': isDragImage }"
      @dragenter.prevent="dragenterFocusIn"
      @dragover.prevent="dragenterFocusIn"
      @dragleave.prevent="dragenterFocusOut"
      @drop.prevent="handleDrop"
    )
      .picture-upload__edit(v-if="!renderedPhoto")
        .picture-upload__edit-text Перетащите или загрузите для загрузки изображения
        button(
          type="button"
          @click="uploadFile"
        ).app-button.picture-upload__edit-btn Загрузить
      img.picture-upload__image(
        v-if="renderedPhoto && !isDragImage"
        :src="renderedPhoto")
    input.picture-upload__file#file-input(
      ref="file-input"
      type="file"
      accept="image/jpeg,image/png"
      @change="handlePhotoUpload"
    )
    button.app-button.picture-upload__edit-link(
      v-if="renderedPhoto"
      type="button"
      @click="uploadFile"
    ) Изменить
    transition(name="slide-up")
      .picture-upload__error(v-if="errorMessage")
        error-tooltip {{ errorMessage }}
</template>

<script>
import { renderer, getAbsoluteImgPath } from "@/helpers/pictures";

export default {
  components: {
    ErrorTooltip: () => import("./ErrorTooltip.vue"),
  },
  props: {
    value: {
      type: File | String,
      default: null
    },
    maxSize: {
      type: Number,
      default: 1500000
    },
    errorMessage: {
      type: String,
      default: ""
    }
  },
  watch: {
    value(value) {
      this.setRenderedPhoto();
    }
  },
  data() {
    return {
      isDragImage: false,
      renderedPhoto: null
    };
  },
  methods: {
    uploadFile() {
      this.$refs["file-input"].click();
    },
    setRenderedPhoto() {
      if (typeof this.value === "string") {
        this.renderedPhoto = getAbsoluteImgPath(this.value);
      } else {
        if (this.value) {
          this.renderPhoto(this.value);
        } else {
          this.renderedPhoto = null;
        }
      }
    },
    async renderPhoto(file) {
      try {
        const rendererResult = await renderer(file);
        this.renderedPhoto = rendererResult;
      } catch (error) {
        alert(error.message);
        this.$emit("input", null);
      }
    },
    dragenterFocusIn(e) {
      this.isDragImage = true;
    },
    dragenterFocusOut() {
      this.isDragImage = false;
    },
    handleDrop({ dataTransfer }) {
      const file = dataTransfer.files[0];
      this.handlePhotoUpload(file);
      this.isDragImage = false;
    },
    async handlePhotoUpload(file) {
      if (file.size > this.maxSize) {
        alert("Слишком большой размер файла (максимум 1.5MB)");
        return;
      }
      this.$emit("input", file);
    }
  },
  created() {
    this.setRenderedPhoto();
  }
}
</script>

<style lang="postcss" scoped>
@import '../../styles/mixins.pcss';

.picture-upload {
  position: relative;
  align-self: start;
}

.picture-upload__control {
  display: block;
  width: 100%;
  min-height: 276px;
  cursor: pointer;
}

.picture-upload__control-drag {
  & .picture-upload__edit {
    background-color: #dee4dd;
  }
}

.picture-upload__edit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px dashed #a1a1a1;
  background-color: #dee4ed;
  min-height: 276px;
}

.picture-upload__edit-text {
  width: 40%;
  opacity: .5;
  line-height: 2;
  margin-bottom: 1.5625rem;
  text-align: center;
}

.picture-upload__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.picture-upload__edit-link {
  margin: 30px auto 0;
  display: block;
}

.picture-upload__file {
  display: none;
}

.picture-upload__error {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.slide-up {
  &-enter-to,
  &-leave {
    transition: all 0.3s ease;
  }

  &-enter,
  &-leave-to {
    transform: translateY(50%);
    opacity: 0;
  }
}
</style>