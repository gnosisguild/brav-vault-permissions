import type { Contracts } from "./.lib/types";

export default {
  eth: {
    bracket: {
      bravUSDC: "0x9f96E4B65059b0398B922792d3fF9F10B4567533",
      wbravUSDC: "0x7309E1E2e74af170c69bdE8FCB30397f8697D5FF",
    },
    morpho: {
      morpho: "0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb",
      ethereumGeneralAdapter1: "0x4A6c312ec70E8747a587EE860a0353cd42Be0aE0", // extends GeneralAdapter1
    },
  },
} as const satisfies Contracts;
