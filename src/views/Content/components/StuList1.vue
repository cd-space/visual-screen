<template>
  <div>
    <ScrollTable :config="tableConfig" />
  </div>
</template>

<script>
import ScrollTable from "./ScrollTable.vue";
// import { useUserInfoStore } from "@/stores/stuList.js";

export default {
  components: {
    ScrollTable,
  },
  data() {
    return {
      tableConfig: {
        header: ["列1", "列2", "列3"],
        data: [
          ["行1列1", "行1列2", "行1列3"],
          ["行2列1", "行2列2", "行2列3"],
          ["行3列1", "行3列2", "行3列3"],
          ["行4列1", "行4列2", "行4列3"],
          ["行5列1", "行5列2", "行5列3"],
          ["行6列1", "行6列2", "行6列3"],
        ],
        index: true,
        columnWidth: [100, 200, 100],
        align: ["center", "left", "right"],
        carousel: "page",
      },
    };
  },
};
</script>
