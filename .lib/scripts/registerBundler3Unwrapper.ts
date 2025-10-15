#!/usr/bin/env ts-node
import { Contract, getAddress, Interface } from "ethers";
import { addresses } from "../../morphoAddresses";
import yargs from "yargs";
import assert from "assert";
import { chains, fetchRolesMod } from "zodiac-roles-sdk";

type ChainId = keyof typeof addresses;

const MORPHO_BUNDLER3_UNWRAPPER = "0x9cAfcC440a748000283aF4014818BaB12A072c95";
const MULTICALL_SELECTOR = "0x374f435d";

export const registerBundler3Unwrapper = (
  chainId: ChainId,
  rolesMod: `0x${string}`,
): { to: `0x${string}`; data: `0x${string}` } => {
  if (!(chainId in addresses)) {
    throw new Error(
      `Morpho bundler3 unwrapper not supported for chain ${chainId}`,
    );
  }

  const bundler3Address = addresses[chainId].Bundler3;

  // ethers v6 Interfaces for encoding
  const peripheryInterface = new Interface([
    "function setTransactionUnwrapper(address to, bytes4 selector, address adapter)",
  ]);

  const rolesContract = new Contract(rolesMod, peripheryInterface);
  const data = rolesContract.interface.encodeFunctionData(
    "setTransactionUnwrapper",
    [bundler3Address, MULTICALL_SELECTOR, MORPHO_BUNDLER3_UNWRAPPER],
  ) as `0x${string}`;

  return { to: rolesMod, data };
};

function parseMod(modArg: string) {
  const components = modArg.trim().split(":");
  assert(components.length === 2, `Invalid prefixed address: ${modArg}`);
  const [chainPrefix, modAddress] = components;

  const chainId = Object.keys(chains)
    .map((key) => parseInt(key) as ChainId)
    .find((id) => chains[id].prefix === chainPrefix);
  assert(chainId, `Chain is not supported: ${chainPrefix}`);

  // validates a valid ethereum address
  const address = getAddress(modAddress!) as `0x${string}`;

  return { chainId, chainPrefix, address } as const;
}

async function main() {
  const args = await yargs(process.argv.slice(2))
    .usage("$0 <chain-prefix>:<mod-address>")
    .positional("mod", {
      demandOption: true,
      describe:
        'The chain-prefixed address of the Roles modifier, e.g. "eth:0x1234...5678"',
      type: "string",
    }).argv;

  const [modArg] = args._ as [string, string, string];
  const { chainId, chainPrefix, address } = parseMod(modArg);

  const { to, data } = registerBundler3Unwrapper(chainId, address);
  console.log({ to, data });
}

main();
