import type { Contracts } from "./.lib/types";

export default {
  eth: {
    morpho: {
      morpho: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
      ethereumGeneralAdapter1: "0x4A6c312ec70E8747a587EE860a0353cd42Be0aE0", // extends GeneralAdapter1
    },
  },
} as const satisfies Contracts;
