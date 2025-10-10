import { c, forAll } from "zodiac-roles-sdk";

export const allowErc20Approve = (
  tokens: readonly `0x${string}`[],
  spender: `0x${string}`,
  allowanceKey?: `0x${string}`,
) =>
  forAll(tokens, {
    signature: "approve(address,uint256)",
    condition: c.calldataMatches(
      [spender, allowanceKey ? c.withinAllowance(allowanceKey) : undefined],
      ["address", "uint256"],
    ),
  });
