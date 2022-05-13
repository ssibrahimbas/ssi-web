<script setup lang="ts">
useHead({
  titleTemplate: "My App - %s",
  // or, instead:
  // titleTemplate: (title) => `My App - ${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
});

const locales = useLocales();
const locale = useLocale();

const date = useLocaleDate(new Date("2016-10-26") /* NUXT_BIRTHDAY */);
</script>

<template>
  <Head>
    <Title>selam</Title>
  </Head>
  <h1>laskdlaskd</h1>
  <p>{{ date }}</p>
  {{ locale }}
</template>
