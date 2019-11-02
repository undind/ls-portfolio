<template lang="pug">
  section.about-section
    .admin-container
      .about__header
        h1.about__title {{$route.meta.title}}
      .about__content
        .card
          .card__header.skill-group
            .skill-group__title
              input.app-input.skill-group__input(placeholder="Название новой группы")
            .skill-group__controls
              button.skill-group__button
                icon.skill-group__icon.skill-group__accept(name="Tick")
              button.skill-group__button
                icon.skill-group__icon.skill-group__delete(name="Cross")
          .card__body
            .skills
          .card__footer
            .new-skill
              .new-skill__name
                input.app-input.new-skill__input(placeholder="Новый навык" disabled="disabled")
              .new-skill__percent
                input.app-input.new-skill__input(value="100" disabled="disabled")
                .skills__percent-measure %
              button.new-skill__button(disabled="disabled")
                icon.new-skill__icon(name="Plus")
        .card
          .card__header.skill-group
            .skill-group__title
              input.app-input.skill-group__input(value="Frontend")
            .skill-group__controls
              button.skill-group__button
                icon.skill-group__icon.skill-group__edit(name="Pencil")
              //- button.skill-group__button
              //-   icon.skill-group__icon.skill-group__delete(name="Cross")
          .card__body
            .skills
              - var skills = [['Html', 30, 'edit'], ['CSS', 50], ['JavaScript', 100]]
                each skill in skills
                  .skills__name
                    if skill[2]
                      input.app-input(value=skill[0])
                    else
                      input.app-input(value=skill[0] disabled="disabled")
                  .skills__percent
                    if skill[2]
                      input.app-input(value=skill[1])
                    else
                      input.app-input(value=skill[1] disabled="disabled")
                    .skills__percent-measure %
                  if skill[2]
                    .skills__controls
                      button.skills__button
                        icon.skills__icon.skills__accept(name="Tick")
                      button.skills__button
                        icon.skills__icon.skills__delete(name="Cross")
                  else
                    .skills__controls
                      button.skills__button
                        icon.skills__icon.skills__edit(name="Pencil")
                      button.skills__button
                        icon.skills__icon.skills__trash(name="Trash")
          .card__footer
            .new-skill
              .new-skill__name
                input.app-input.new-skill__input(placeholder="Новый навык")
              .new-skill__percent
                input.app-input.new-skill__input(value="100")
                .skills__percent-measure %
              button.new-skill__button
                icon.new-skill__icon(name="Plus")
</template>

<script>
export default {
   components: {
    Icon: () => import("components/Icon.vue")
  }
}
</script>