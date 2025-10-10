import { NestedAddressesInput } from "@gnosis-guild/eth-sdk/dist/config";
import { ChainId, Permission, PermissionSet, chains } from "zodiac-roles-sdk";

type ChainPrefix = (typeof chains)[ChainId]["prefix"];

export type Contracts = {
  [chainPrefix in ChainPrefix]?: NestedAddressesInput;
};

export type Members = `0x${string}`[];

export type Permissions = (
  | Permission
  | PermissionSet
  | Promise<PermissionSet>
)[];
